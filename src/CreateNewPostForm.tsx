import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { rtaCreateNewPost } from "./api";
import { useStore } from "./store/zstore";

export const CreateNewPostForm = () => {
    const [titleInputValue, setTitleInputValue] = useState<string>("");
    const [contentInputValue, setContentInputValue] = useState<string>("");
    const [priceInputValue, setPriceInputValue] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const accessToken = useStore((state) => state.accessToken);

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
        const body = {
            title: titleInputValue,
            content: contentInputValue,
            price: priceInputValue,
        };
        await rtaCreateNewPost(body, accessToken);
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
