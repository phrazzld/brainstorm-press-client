import React from "react";
import { Post, TPost } from "./Post";
import { usePosts } from "./usePosts";

export const PostsList = () => {
    const posts = usePosts();

    console.log("posts:", posts)

    return (
        <div id="posts-list-container">
            {posts && posts.map((post: TPost) => <Post post={post} />)}

            {!posts && <h3>No posts found</h3>}
        </div>
    );
};
