import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useStore } from "./store/zstore";

export const CreateNewPostForm = () => {
    const [titleInputValue, setTitleInputValue] = useState<string>("");
    const [contentInputValue, setContentInputValue] = useState<string>("");
    const [priceInputValue, setPriceInputValue] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const user = useStore((state) => state.user)

    const handleTitleInputChange = (event: any): void => {
        setTitleInputValue(event.target.value);
    };

    const handleContentInputChange = (event: any): void => {
        setContentInputValue(event.target.value);
    };

    const handlePriceInputChange = (event: any): void => {
        setPriceInputValue(event.target.value);
    };

    const submitNewPost = async (): Promise<void> => {
        if (!user) {
            throw new Error("Cannot submit new post without a user.")
        }

        await fetch("/api/posts", {
            method: "POST",
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
        setSubmitted(true);
    };

    if (submitted) {
        return <Redirect to="/" />;
    }

    return (
        <div id="create-new-post-container">
            <div id="new-post-title-input-container">
                <p>Title:</p>
                <input
                    type="text"
                    name="title"
                    value={titleInputValue}
                    onChange={handleTitleInputChange}
                    required
                />
            </div>
            <div id="new-post-content-input-container">
                <p>Content:</p>
                <textarea
                    value={contentInputValue}
                    onChange={handleContentInputChange}
                    rows={3}
                />
            </div>
            <div id="new-post-price-input-container">
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
                <button onClick={submitNewPost}>Submit</button>
            </div>
        </div>
    );
};
