import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { PostsFilter } from "../components/PostsFilter";
import { PostsList } from "../components/PostsList";
import { useAccessToken } from "../hooks/useAccessToken";
import { useBlogPosts } from "../hooks/useBlogPosts";
import { usePublicUserInfo } from "../hooks/usePublicUserInfo";
import { useStore } from "../store/zstore";
import { rtaGetSubs, rtaSubscribe, rtaUnsubscribe } from "../utils/api";
import { Colors } from "../utils/Colors";
import { Subscription } from "../utils/types";

type BlogParams = {
    username: string;
};

export const Blog = () => {
    const { username } = useParams<BlogParams>();
    const publicUserInfo = usePublicUserInfo(username);
    const user = useStore((state) => state.user);
    const accessToken = useAccessToken();
    const [page, setPage] = useState<number>(1);

    const [search, setSearch] = useState<string>("");
    const [free, setFree] = useState<boolean>(false);
    const { posts, totalPages } = useBlogPosts(username, page, free, search);

    const isAuthor = publicUserInfo?._id === user?._id;
    const [subs, setSubs] = useState<Array<Subscription>>([]);
    const [sub, setSub] = useState<Subscription | null>(null);
    const [subscribed, setSubscribed] = useState<boolean>(!!sub);

    // Fetch subscriptions on mount, and when the user subscribes and unsubscribes
    useEffect(() => {
        if (accessToken) {
            rtaGetSubs(accessToken).then((res: Array<Subscription>) =>
                setSubs([...res])
            );
        }
    }, [accessToken, subscribed]);

    // Find the subscription for the current author when reader's subs are loaded
    useEffect(() => {
        if (subs) {
            const s = subs.find((s) => s.author === publicUserInfo?._id);
            if (s) {
                setSub({ ...s });
            } else {
                setSub(null);
            }
        }
    }, [subs]);

    // Change subscribed state when sub changes
    useEffect(() => {
        if (sub) {
            setSubscribed(true);
        } else {
            setSubscribed(false);
        }
    }, [sub]);

    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ): void => {
        setPage(value);
    };

    const subscribe = async (): Promise<void> => {
        if (!publicUserInfo) {
            throw new Error("Cannot find author to subscribe to.");
        }

        await rtaSubscribe(publicUserInfo._id, accessToken);
        setSubscribed(true);
    };

    const unsubscribe = async (): Promise<void> => {
        if (!sub) {
            throw new Error("Cannot find subscription to delete.");
        }

        await rtaUnsubscribe(sub._id, accessToken);
        setSubscribed(false);
    };

    return (
        <div id="blog-container">
            <Helmet>
                <title>{`${publicUserInfo?.blog} - Brainstorm Press`}</title>
            </Helmet>
            <Typography variant="h1" component="div" gutterBottom>
                {publicUserInfo?.blog}
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
                {publicUserInfo?.username}
            </Typography>
            {!isAuthor && !subscribed && (
                <Button onClick={subscribe}>Subscribe</Button>
            )}
            {!isAuthor && subscribed && (
                <Button onClick={unsubscribe}>Unsubscribe</Button>
            )}
            {publicUserInfo?.btcAddress && (
                <Typography
                    variant="subtitle1"
                    component="div"
                    style={{ display: "flex", alignItems: "center" }}
                    gutterBottom
                >
                    <FontAwesomeIcon
                        style={{
                            fontSize: 30,
                            marginRight: 10,
                            color: Colors.btcOrange,
                        }}
                        icon={faBitcoin}
                    />
                    {publicUserInfo?.btcAddress}
                </Typography>
            )}
            <PostsFilter onFreeChanged={setFree} onSearchChanged={setSearch} />
            <PostsList posts={posts} />
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePaginationChange}
            />
        </div>
    );
};
