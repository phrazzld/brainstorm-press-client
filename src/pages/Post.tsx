import EventIcon from "@mui/icons-material/Event";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import QRCode from "react-qr-code";
import { Link, Redirect, useParams } from "react-router-dom";
import { useAccessToken } from "../hooks/useAccessToken";
import { usePost } from "../hooks/usePost";
import { useStore } from "../store/zstore";
import {
    rtaCheckPremiumAccess,
    rtaCreateInvoice,
    rtaDeletePost,
    rtaGetNodeStatus,
    rtaLogPayment,
    rtaUpdatePost,
} from "../utils/api";
import { formatDateString } from "../utils/time";
import { Invoice, NodeStatus, PostParams } from "../utils/types";

export const Post = () => {
    const { postId } = useParams<PostParams>();
    const post = usePost(postId);

    const [editing, setEditing] = useState(false);
    const [redirect, setRedirect] = useState("");
    const [paid, setPaid] = useState(false);
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [checkedAccess, setCheckedAccess] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);

    const user = useStore((state) => state.user);
    const accessToken = useAccessToken();
    const isCreator = post?.user?._id === user?._id;

    const [postNodeStatus, setPostNodeStatus] = useState<NodeStatus>(
        "Looking."
    );

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const editor: any = React.useRef(null);

    useEffect(() => {
        if (post) {
            setEditorState(
                EditorState.createWithContent(
                    convertFromRaw(JSON.parse(post.content))
                )
            );
        }
    }, [post]);

    useEffect(() => {
        if (post && postNodeStatus !== "Looking.") {
            setLoading(false);
        }
    }, [post, postNodeStatus]);

    useEffect(() => {
        if (post && post.user.node) {
            rtaGetNodeStatus(
                post.user.node.toString(),
                accessToken
            ).then((res) => setPostNodeStatus(res));
        }

        if (post && !post.user.node) {
            setPostNodeStatus("Not found.");
        }
    }, [post, accessToken]);

    useEffect(() => {
        const createInvoice = async () => {
            if (!user) {
                throw new Error("Cannot create invoice without a user.");
            }

            const response = await rtaCreateInvoice(postId, accessToken);
            setInvoice({
                payreq: response.payreq,
                hash: response.hash,
                amount: response.amount,
            });
        };

        if (
            post &&
            user &&
            !paid &&
            !invoice &&
            !isCreator &&
            postNodeStatus === "Connected." &&
            checkedAccess
        ) {
            createInvoice();
        }
    }, [
        post,
        user,
        paid,
        invoice,
        postNodeStatus,
        checkedAccess,
        isCreator,
        accessToken,
        postId,
    ]);

    useEffect(() => {
        if (post && accessToken) {
            rtaCheckPremiumAccess(post.user._id, accessToken).then((res) => {
                setPaid(res.paid);
                setCheckedAccess(true);
            });
        }
    }, [post, accessToken]);

    useEffect(() => {
        if (post) {
            // TODO: Use wss
            const webSocket = new WebSocket("ws://localhost:4000/api/events");
            webSocket.onopen = () => {
                console.debug("Connected to web socket.");
            };
            webSocket.onmessage = async (event) => {
                console.log("ws onmessage, post:", post);
                const eventData = JSON.parse(event.data);
                if (eventData.type === "invoice-paid") {
                    if (!post) {
                        throw new Error("Cannot log payment without a post.");
                    }
                    setPaid(true);
                    const body = {
                        hash: eventData.data.hash,
                    };
                    rtaLogPayment(post.user._id, body, accessToken);
                }
            };
        }
    }, [post, accessToken]);

    const editPost = (): void => {
        if (isCreator) {
            setEditing(true);
        }
    };

    const publishPost = async (): Promise<void> => {
        if (!post) {
            throw new Error("Cannot find post to publish.");
        }

        if (!user) {
            throw new Error("Cannot publish post without a user.");
        }

        const body = { ...post, published: true };
        await rtaUpdatePost(post._id, body, accessToken);
        setRedirect("/posts/drafts");
    };

    const deletePost = async (): Promise<void> => {
        if (!post) {
            throw new Error("Cannot find post to delete.");
        }

        await rtaDeletePost(post._id, accessToken);
        setRedirect("/");
    };

    const LoadingPostSkeleton = () => {
        return (
            <>
                <Typography variant="h1" gutterBottom>
                    <Skeleton />
                </Typography>
                <Typography variant="h2" gutterBottom>
                    <Skeleton />
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </Typography>
            </>
        );
    };

    const Paywall = () => {
        return (
            <>
                <Typography variant="h1" component="div" gutterBottom>
                    {post?.title}
                </Typography>
                <Paper
                    elevation={3}
                    style={{
                        padding: 20,
                        maxWidth: "500px",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    <Typography variant="h5" component="div" gutterBottom>
                        This is a premium post.
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                        Pay {invoice?.amount} sats to get access to all of{" "}
                        {post?.user.username}'s premium posts for thirty days.
                    </Typography>
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: 20,
                        }}
                    >
                        <QRCode value={invoice?.payreq || ""} />
                    </Box>
                    <Typography
                        variant="body1"
                        component="div"
                        style={{ wordWrap: "break-word" }}
                        gutterBottom
                    >
                        {invoice?.payreq}
                    </Typography>
                </Paper>
            </>
        );
    };

    const showPaywall: boolean = !!(
        post &&
        !isCreator &&
        !paid &&
        post.premium &&
        invoice &&
        !editing
    );

    const showPost: boolean = !!(
        post &&
        postNodeStatus !== "Looking." &&
        (isCreator ||
            paid ||
            !post.premium ||
            postNodeStatus === "Not found.") &&
        !editing
    );

    const PostContent = () => {
        if (!post) {
            return <></>;
        }

        return (
            <>
                <Typography variant="h1" component="div" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="h2" component="div" gutterBottom>
                    Written By: {post.user.username}
                </Typography>
                <div
                    style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center",
                        marginBottom: 30,
                    }}
                >
                    <EventIcon
                        style={{
                            color: "rgba(0, 0, 0, 0.6)",
                            marginRight: 10,
                        }}
                    />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {formatDateString(post.createdAt.toString())}
                    </Typography>
                </div>
                <Typography variant="body1" component="div" gutterBottom>
                    <Editor
                        ref={editor}
                        editorState={editorState}
                        onChange={setEditorState}
                        readOnly={true}
                    />
                </Typography>
            </>
        );
    };

    const Actions = () => {
        return (
            <div className="post-actions">
                <Button className="delete-post" onClick={deletePost}>
                    Delete
                </Button>
                <Button className="edit-post" onClick={editPost}>
                    Edit
                </Button>
                {!post?.published && (
                    <Button className="publish-post" onClick={publishPost}>
                        Publish
                    </Button>
                )}
            </div>
        );
    };

    if (redirect) {
        return <Redirect to="/" />;
    }

    if (editing) {
        return <Redirect to={`/posts/${postId}/edit`} />;
    }

    if (!user && post && post.premium) {
        return (
            <Box>
                <Typography variant="h6" component="div" gutterBottom>
                    You have to be logged in to read paywalled posts.
                </Typography>
                <Link to="/login">Log in</Link>
            </Box>
        );
    }

    return (
        <div id="post-container">
            <Helmet>
                <title>
                    {`${post?.title} - ${post?.user.username} - Brainstorm Press`}
                </title>
            </Helmet>
            {loading && <LoadingPostSkeleton />}

            {showPaywall && <Paywall />}

            {showPost && (
                <>
                    <PostContent />
                    {isCreator && <Actions />}
                </>
            )}
        </div>
    );
};
