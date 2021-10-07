import React from "react";
import { Post, PostCard } from "./PostCard";

interface Props {
    posts: Array<Post>;
}

export const PostsList = (props: Props) => {
    const { posts } = props;

    return (
        <div id="posts-list-container">
            {!posts && <h3>Loading...</h3>}

            {posts.length > 0 &&
                posts.map((post: Post) => (
                    <PostCard key={post._id} post={post} />
                ))}

            {posts.length === 0 && <h3>No posts found</h3>}
        </div>
    );
};
