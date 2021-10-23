import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Pagination from "@mui/material/Pagination";
import Switch from "@mui/material/Switch";
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

    const [free, setFree] = useState<boolean>(false);
    const { posts, totalPages } = useBlogPosts(userId, page, free);

    const handleFreeChange = (event: React.ChangeEvent<unknown>): void => {
        setFree((free: boolean) => !free);
    };

    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ): void => {
        setPage(value);
    };

    return (
        <div id="blog-container">
            <h1>{posts[0]?.user.blog}</h1>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={free}
                            onChange={handleFreeChange}
                            inputProps={{ "aria-label": "controlled" }}
                            defaultChecked
                        />
                    }
                    label="Only show free posts"
                />
            </FormGroup>
            <PostsList posts={posts} />
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePaginationChange}
            />
        </div>
    );
};
