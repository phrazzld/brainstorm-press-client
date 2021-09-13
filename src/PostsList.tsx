import React from "react";
import { Post, TPost } from "./Post";
import { usePosts } from "./usePosts";

export const PostsList = () => {
    const posts = usePosts();

    return (
        <div id="posts-list-container">
            {posts &&
                posts.map((post: TPost) => <Post key={post.id} post={post} />)}

            {!posts && <h3>No posts found</h3>}
        </div>
    );
};
