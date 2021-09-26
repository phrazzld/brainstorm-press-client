import React, { useState } from "react";
import { useStore } from "./store/zstore";
import { Redirect } from 'react-router-dom'

export const CreateNewPostForm = () => {
    const [titleInputValue, setTitleInputValue] = useState<string>();
    const [bodyInputValue, setBodyInputValue] = useState<string>();
    const [submitted, setSubmitted] = useState<boolean>(false)

    const jwt: string = useStore((state) => state.jwt);

    const handleTitleInputChange = (event: any): void => {
        setTitleInputValue(event.target.value);
    };

    const handleBodyInputChange = (event: any): void => {
        setBodyInputValue(event.target.value);
    };

    const submitNewPost = async (): Promise<void> => {
        await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                title: titleInputValue,
                content: bodyInputValue,
            }),
        });
        setSubmitted(true)
    };

    if (submitted) {
        return <Redirect to="/" />
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
