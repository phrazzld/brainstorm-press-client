import React, { useState } from "react";

export const CreateNewPostForm = () => {
    const [titleInputValue, setTitleInputValue] = useState<string>();
    const [authorInputValue, setAuthorInputValue] = useState<string>();
    const [bodyInputValue, setBodyInputValue] = useState<string>();

    const handleTitleInputChange = (event: any): void => {
        setTitleInputValue(event.target.value);
    };

    const handleAuthorInputChange = (event: any): void => {
        setAuthorInputValue(event.target.value);
    };

    const handleBodyInputChange = (event: any): void => {
        setBodyInputValue(event.target.value);
    };

    const submitNewPost = (): void => {
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: titleInputValue,
                author: authorInputValue,
                body: bodyInputValue,
            }),
        });
    };

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
            <div id="new-post-author-input-container">
                <p>Author:</p>
                <input
                    type="text"
                    name="author"
                    value={authorInputValue}
                    onChange={handleAuthorInputChange}
                    required
                />
            </div>
            <div id="new-post-body-input-container">
                <p>Body:</p>
                <textarea
                    value={bodyInputValue}
                    onChange={handleBodyInputChange}
                    rows={3}
                />
            </div>
            <div id="new-post-submit-container">
                <button onClick={submitNewPost}>Submit</button>
            </div>
        </div>
    );
};
