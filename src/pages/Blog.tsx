import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PostsList } from "../components/PostsList";
import { useBlogPosts } from "../hooks/useBlogPosts";

type BlogParams = {
    userId: string;
};

export const Blog = () => {
    const { userId } = useParams<BlogParams>();
    const [page, setPage] = useState<number>(1);
    const { posts, totalPages } = useBlogPosts(userId, page);

    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ): void => {
        setPage(value);
    };

    return (
        <div id="blog-container">
            <h1>{posts[0]?.user.blog}</h1>
            <PostsList posts={posts} />
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePaginationChange}
            />
        </div>
    );
};
