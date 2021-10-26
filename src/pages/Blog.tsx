import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PostsFilter } from "../components/PostsFilter";
import { PostsList } from "../components/PostsList";
import { useBlogPosts } from "../hooks/useBlogPosts";
import { usePublicUserInfo } from "../hooks/usePublicUserInfo";
import { Colors } from "../utils/Colors";

type BlogParams = {
    userId: string;
};

export const Blog = () => {
    const { userId } = useParams<BlogParams>();
    const publicUserInfo = usePublicUserInfo(userId);
    const [page, setPage] = useState<number>(1);

    const [search, setSearch] = useState<string>("");
    const [free, setFree] = useState<boolean>(false);
    const { posts, totalPages } = useBlogPosts(userId, page, free, search);

    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ): void => {
        setPage(value);
    };

    return (
        <div id="blog-container">
            <Typography variant="h1" component="div" gutterBottom>
                {publicUserInfo?.blog}
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
                {publicUserInfo?.username}
            </Typography>
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
