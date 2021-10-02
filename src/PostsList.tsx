import React from "react";
import { PostCard, Post } from "./PostCard";
import { usePosts } from "./usePosts";

export const PostsList = () => {
    const posts = usePosts();

    return (
        <div id="posts-list-container">
            {posts &&
                posts.map((post: Post) => <PostCard key={post._id} post={post} />)}

            {!posts && <h3>No posts found</h3>}
        </div>
    );
};
