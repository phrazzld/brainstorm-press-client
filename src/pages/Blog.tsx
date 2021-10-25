import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PostsFilter } from "../components/PostsFilter";
import { PostsList } from "../components/PostsList";
import { useBlogPosts } from "../hooks/useBlogPosts";

type BlogParams = {
    userId: string;
};

export const Blog = () => {
    const { userId } = useParams<BlogParams>();
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
                {posts[0]?.user.blog}
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
                {posts[0]?.user.username}
            </Typography>
            {posts[0]?.user.btcAddress && (
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
                            color: "#f2a900",
                        }}
                        icon={faBitcoin}
                    />
                    {posts[0]?.user.btcAddress}
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
