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
import { useSubs } from "../hooks/useSubs";
import { useStore } from "../store/zstore";
import { rtaSubscribe, rtaUnsubscribe } from "../utils/api";
import { Colors } from "../utils/Colors";

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
    const subs = useSubs();
    const sub = subs?.find((sub) => sub.author === publicUserInfo?._id);
    const [subscribed, setSubscribed] = useState<boolean>(!!sub);

    useEffect(() => {
        if (sub && !subscribed) {
            setSubscribed(true);
        } else if (!sub && subscribed) {
            setSubscribed(false);
        }
    }, [sub, subscribed]);

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
