import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { PostsList } from "../components/PostsList";
import { useDrafts } from "../hooks/useDrafts";

export const Drafts = () => {
    const [page, setPage] = useState<number>(1);
    const { posts, totalPages } = useDrafts(page);

    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ): void => {
        setPage(value);
    };

    return (
        <div id="drafts-container">
            <Typography variant="h3" gutterBottom>
                Drafts
            </Typography>
            <PostsList posts={posts} />
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePaginationChange}
            />
        </div>
    );
};
