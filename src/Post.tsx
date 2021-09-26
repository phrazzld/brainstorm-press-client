import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useStore } from "./store/zstore";
import { usePost } from "./usePost";

type PostParams = {
    postId: string;
};

export const Post = () => {
    const { postId } = useParams<PostParams>();
    const post = usePost(postId);

    const [redirect, setRedirect] = useState<boolean>(false);

    const jwt: string = useStore((state) => state.jwt);

    const deletePost = async (): Promise<void> => {
        if (!post) {
            throw new Error("Cannot find post to delete");
        }

        const url: string = `/api/posts/${post._id}`;
        await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        setRedirect(true);
    };

    if (redirect) {
        return <Redirect to="/" />;
    }

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
                    <div className="post-actions">
                        <button className="delete-post" onClick={deletePost}>
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
