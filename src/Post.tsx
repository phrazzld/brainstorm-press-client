import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useStore } from "./store/zstore";
import { usePost } from "./usePost";

type PostParams = {
    postId: string;
};

export const Post = () => {
    const { postId } = useParams<PostParams>();
    const post = usePost(postId);

    const [editing, setEditing] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<boolean>(false);

    const [titleInputValue, setTitleInputValue] = useState<string>("");
    const [contentInputValue, setContentInputValue] = useState<string>("");
    const [priceInputValue, setPriceInputValue] = useState<number>(0);

    useEffect(() => {
        if (post && !titleInputValue && !contentInputValue) {
            setTitleInputValue(post.title);
            setContentInputValue(post.content);
        }
    }, [post, titleInputValue, contentInputValue]);

    const jwt: string = useStore((state) => state.jwt);

    const editPost = (): void => {
        setEditing(true);
    };

    const submitEdits = async (): Promise<void> => {
        if (!post) {
            throw new Error("Cannot find post to edit");
        }

        const url: string = `/api/posts/${post._id}`;
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                title: titleInputValue,
                content: contentInputValue,
                price: priceInputValue,
            }),
        });
        setEditing(false);
    };

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

    const handleTitleInputChange = (event: any): void => {
        setTitleInputValue(event.target.value);
    };

    const handleContentInputChange = (event: any): void => {
        setContentInputValue(event.target.value);
    };

    const handlePriceInputChange = (event: any): void => {
        setPriceInputValue(event.target.value);
    };

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div id="post-container">
            {!post && <h1>Loading...</h1>}

            {post && !editing && (
                <>
                    <div id="post-title-container">
                        <h1 id="post-title">{titleInputValue || post.title}</h1>
                    </div>
                    <div id="post-price-container">
                        <h4>
                            Pay {priceInputValue || post.price} sats to read
                        </h4>
                    </div>
                    <div id="post-content-container">
                        <p id="post-content">
                            {contentInputValue || post.content}
                        </p>
                    </div>
                    <div className="post-actions">
                        <button className="delete-post" onClick={deletePost}>
                            Delete
                        </button>
                        <button className="edit-post" onClick={editPost}>
                            Edit
                        </button>
                    </div>
                </>
            )}

            {editing && (
                <div id="edit-post-form">
                    <div id="edit-post-title-input-container">
                        <p>Title:</p>
                        <input
                            type="text"
                            name="title"
                            value={titleInputValue}
                            onChange={handleTitleInputChange}
                            required
                        />
                    </div>
                    <div id="edit-post-body-input-container">
                        <p>Content:</p>
                        <textarea
                            value={contentInputValue}
                            onChange={handleContentInputChange}
                            rows={3}
                        />
                    </div>
                    <div id="edit-post-price-input-container">
                        <p>Price:</p>
                        <input
                            type="number"
                            name="price"
                            value={priceInputValue}
                            onChange={handlePriceInputChange}
                            min="0"
                            max="10000"
                            required
                        />
                    </div>
                    <div id="new-post-submit-container">
                        <button onClick={submitEdits}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};
