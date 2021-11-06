import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";
import { PostsList } from "../components/PostsList";
import { usePostsFromSubs } from "../hooks/usePostsFromSubs";

export const Subs = () => {
    const [page, setPage] = useState<number>(1);
    const { posts, totalPages } = usePostsFromSubs(page);

    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ): void => {
        setPage(value);
    };

    return (
        <div id="subs-container">
            <h3>Subscriptions</h3>
            <PostsList posts={posts} />
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePaginationChange}
            />
        </div>
    );
};
