import React from "react";
import { useParams } from "react-router-dom";
import { usePost } from "./usePost";

type PostParams = {
    postId: string;
};

export const Post = () => {
    const { postId } = useParams<PostParams>();
    const post = usePost(postId);

    return (
        <div id="post-container">
            {!post && <h1>Loading...</h1>}
            {post && (
                <>
                    <div id="post-title-container">
                        <h1 id="post-title">{post.title}</h1>
                    </div>
                    <div id="post-content-container">
                        <p id="post-content">{post.content}</p>
                    </div>
                </>
            )}
        </div>
    );
};
