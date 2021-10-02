import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useStore } from "./store/zstore";
import { usePost } from "./usePost";

type Invoice = {
    payreq: string;
    hash: string;
    amount: number;
};

type PostParams = {
    postId: string;
};

export const Post = () => {
    const { postId } = useParams<PostParams>();
    const post = usePost(postId);

    const [editing, setEditing] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [paid, setPaid] = useState(false);
    const [invoice, setInvoice] = useState<Invoice | null>(null);

    const [titleInputValue, setTitleInputValue] = useState("");
    const [contentInputValue, setContentInputValue] = useState("");
    const [priceInputValue, setPriceInputValue] = useState(0);

    const createInvoice = async () => {
        if (!user) {
            throw new Error("Cannot create invoice without a user.");
        }

        const res = await fetch(`/api/posts/${postId}/invoice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.jwtToken}`,
            },
        });
        const resJSON = await res.json();
        setInvoice({
            payreq: resJSON.payreq,
            hash: resJSON.hash,
            amount: resJSON.amount,
        });
    };

    const user = useStore((state) => state.user);

    useEffect(() => {
        if (post && !titleInputValue && !contentInputValue) {
            setTitleInputValue(post.title);
            setContentInputValue(post.content);
        }
    }, [post, titleInputValue, contentInputValue]);

    useEffect(() => {
        if (user && !paid && !invoice) {
            createInvoice();
        }
    }, [user, paid, invoice]);

    const editPost = (): void => {
        setEditing(true);
    };

    const submitEdits = async (): Promise<void> => {
        if (!post) {
            throw new Error("Cannot find post to edit.");
        }

        if (!user) {
            throw new Error("Cannot submit edits without a user.");
        }

        const url: string = `/api/posts/${post._id}`;
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.jwtToken}`,
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
            throw new Error("Cannot find post to delete.");
        }

        if (!user) {
            throw new Error("Cannot delete post without a user.");
        }

        const url: string = `/api/posts/${post._id}`;
        await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user?.jwtToken}`,
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

            {post && !paid && !editing && (
                <>
                    <div id="post-title-container">
                        <h1 id="post-title">{titleInputValue || post.title}</h1>
                    </div>
                </>
            )}

            {post && paid && !editing && (
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
