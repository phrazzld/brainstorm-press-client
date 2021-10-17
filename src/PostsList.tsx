import Typography from "@mui/material/Typography";
import React from "react";
import { PostCard } from "./PostCard";
import { Post } from "./types";

interface Props {
    posts: Array<Post>;
}

export const PostsList = (props: Props) => {
    const { posts } = props;

    return (
        <div id="posts-list-container">
            {posts.length > 0 &&
                posts.map((post: Post) => (
                    <PostCard key={post._id} post={post} />
                ))}

            {posts.length === 0 && (
                <Typography variant="body1" gutterBottom>
                    No posts found
                </Typography>
            )}
        </div>
    );
};
