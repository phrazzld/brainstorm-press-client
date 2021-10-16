import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import {
    rtaCreateInvoice,
    rtaDeletePost,
    rtaGetNodeStatus,
    rtaGetPayment,
    rtaLogPayment,
    rtaUpdatePost,
} from "./api";
import { useStore } from "./store/zstore";
import { Invoice, NodeStatus, PostParams } from "./types";
import { usePost } from "./usePost";

export const Post = () => {
    const { postId } = useParams<PostParams>();
    const post = usePost(postId);

    const [editing, setEditing] = useState(false);
    const [redirect, setRedirect] = useState("");
    const [paid, setPaid] = useState(false);
    const [invoice, setInvoice] = useState<Invoice | null>(null);

    const [titleInputValue, setTitleInputValue] = useState("");
    const [contentInputValue, setContentInputValue] = useState("");
    const [priceInputValue, setPriceInputValue] = useState(0);

    const user = useStore((state) => state.user);
    const accessToken = useStore((state) => state.accessToken);
    const isCreator = post?.user?._id === user?._id;

    const [postNodeStatus, setPostNodeStatus] = useState<NodeStatus>(
        "Looking."
    );

    useEffect(() => {
        if (post?.user.node) {
            rtaGetNodeStatus(
                post.user.node.toString(),
                accessToken
            ).then((res) => setPostNodeStatus(res));
        }
    }, [post]);

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

    useEffect(() => {
        if (
            post &&
            !titleInputValue &&
            !contentInputValue &&
            !priceInputValue
        ) {
            setTitleInputValue(post.title);
            setContentInputValue(post.content);
            setPriceInputValue(post.price);
        }
    }, [post, titleInputValue, contentInputValue, priceInputValue]);

    useEffect(() => {
        if (
            post &&
            user &&
            !paid &&
            !invoice &&
            !isCreator &&
            postNodeStatus === "Connected."
        ) {
            createInvoice();
        }
    }, [post, user, paid, invoice, createInvoice, postNodeStatus]);

    useEffect(() => {
        if (postId && user) {
            rtaGetPayment(postId, accessToken).then((res) => setPaid(res.paid));
        }
    }, [postId, user]);

    useEffect(() => {
        const webSocket = new WebSocket("ws://localhost:4000/api/events");
        webSocket.onopen = () => {
            console.debug("Connected to web socket.");
        };
        webSocket.onmessage = async (event) => {
            const eventData = JSON.parse(event.data);
            if (eventData.type === "invoice-paid") {
                setPaid(true);
                const body = {
                    hash: eventData.data.hash,
                };
                rtaLogPayment(postId, body, accessToken);
            }
        };
    }, []);

    const editPost = (): void => {
        setEditing(true);
    };

    const submitEdits = async (): Promise<void> => {
        if (!post) {
            throw new Error("Cannot find post to edit.");
        }

        if (!user) {
            throw new Error("Cannot submit edits without a user.");
        }

        const body = {
            title: titleInputValue,
            content: contentInputValue,
            price: priceInputValue,
            published: post.published,
        };
        await rtaUpdatePost(post._id, body, accessToken);
        setEditing(false);
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

        if (!user) {
            throw new Error("Cannot delete post without a user.");
        }

        await rtaDeletePost(post._id, accessToken);
        setRedirect("/");
    };

    const handleTitleInputChange = (event: any): void => {
        setTitleInputValue(event.target.value);
    };

    const handleContentInputChange = (event: any): void => {
        setContentInputValue(event.target.value);
    };

    const handlePriceInputChange = (event: any): void => {
        setPriceInputValue(event.target.value);
    };

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div id="post-container">
            {!post && <h1>Loading...</h1>}

            {post &&
                !isCreator &&
                !paid &&
                post.price !== 0 &&
                invoice &&
                !editing && (
                    <>
                        <div id="post-title-container">
                            <h1 id="post-title">
                                {titleInputValue || post.title}
                            </h1>
                        </div>
                        <div id="post-paywall-container">
                            <p>Pay Request:</p>
                            <textarea
                                value={invoice.payreq}
                                rows={3}
                                readOnly={true}
                            />
                            <p>Hash: {invoice.hash}</p>
                            <p>Amount: {invoice.amount}</p>
                        </div>
                    </>
                )}

            {post &&
                (isCreator ||
                    paid ||
                    post.price === 0 ||
                    postNodeStatus === "Not found.") &&
                !editing && (
                    <>
                        <div id="post-title-container">
                            <h1 id="post-title">
                                {titleInputValue || post.title}
                            </h1>
                        </div>
                        <div id="post-price-container">
                            {postNodeStatus === "Connected." && (
                                <h4>
                                    Pay {priceInputValue || post.price} sats to
                                    read
                                </h4>
                            )}
                        </div>
                        <div id="post-content-container">
                            <p id="post-content">
                                {contentInputValue || post.content}
                            </p>
                        </div>
                        {isCreator && (
                            <div className="post-actions">
                                <button
                                    className="delete-post"
                                    onClick={deletePost}
                                >
                                    Delete
                                </button>
                                <button
                                    className="edit-post"
                                    onClick={editPost}
                                >
                                    Edit
                                </button>
                                {!post.published && (
                                    <button
                                        className="publish-post"
                                        onClick={publishPost}
                                    >
                                        Publish
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}

            {isCreator && editing && (
                <div id="edit-post-form">
                    <div id="edit-post-title-input-container">
                        <p>Title:</p>
                        <input
                            type="text"
                            name="title"
                            value={titleInputValue}
                            onChange={handleTitleInputChange}
                            required
                        />
                    </div>
                    <div id="edit-post-body-input-container">
                        <p>Content:</p>
                        <textarea
                            value={contentInputValue}
                            onChange={handleContentInputChange}
                            rows={3}
                        />
                    </div>
                    <div id="edit-post-price-input-container">
                        <p>Price:</p>
                        <input
                            type="number"
                            name="price"
                            value={priceInputValue}
                            onChange={handlePriceInputChange}
                            min="0"
                            max="10000"
                            required
                        />
                    </div>
                    <div id="new-post-submit-container">
                        <button onClick={submitEdits}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};
