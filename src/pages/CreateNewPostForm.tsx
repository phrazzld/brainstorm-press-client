import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAccessToken } from "../hooks/useAccessToken";
import { rtaCreateNewPost } from "../utils/api";

export const CreateNewPostForm = () => {
    const [titleInputValue, setTitleInputValue] = useState<string>("");
    const [contentInputValue, setContentInputValue] = useState<string>("");
    const [priceInputValue, setPriceInputValue] = useState<number>(0);
    const accessToken = useAccessToken();

    const [redirect, setRedirect] = useState<string>("");

    const handleTitleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setTitleInputValue(event.target.value);
    };

    const handleContentInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setContentInputValue(event.target.value);
    };

    const handlePriceInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newPrice: number = Number(event.target.value);
        setPriceInputValue(newPrice);
    };

    const publishPost = async (): Promise<void> => {
        const body = {
            title: titleInputValue,
            content: contentInputValue,
            price: priceInputValue,
            published: true,
        };
        const newPost = await rtaCreateNewPost(body, accessToken);
        setRedirect(`/posts/${newPost._id}`);
    };

    const saveDraft = async (): Promise<void> => {
        const body = {
            title: titleInputValue,
            content: contentInputValue,
            price: priceInputValue,
            published: false,
        };
        await rtaCreateNewPost(body, accessToken);
        setRedirect("/posts/drafts");
    };

    const cancelPost = (): void => {
        setRedirect("/");
    };

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return (
        <div id="edit-post-form">
            <Typography variant="h2" gutterBottom>
                Create New Post
            </Typography>
            <TextField
                id="edit-post-title"
                label="Title"
                variant="filled"
                onChange={handleTitleInputChange}
                value={titleInputValue}
                style={styles.formField}
                fullWidth
                required
            />

            <TextField
                id="edit-post-content"
                label="Content"
                multiline
                value={contentInputValue}
                onChange={handleContentInputChange}
                style={styles.formField}
                fullWidth
                required
            />

            <TextField
                id="edit-post-price"
                label="Price"
                value={priceInputValue}
                onChange={handlePriceInputChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">sats</InputAdornment>
                    ),
                }}
                style={styles.formField}
                required
            />

            <div id="button-container" style={styles.formField}>
                <Button
                    variant="contained"
                    onClick={publishPost}
                    style={styles.button}
                >
                    Publish
                </Button>
                <Button
                    variant="outlined"
                    onClick={saveDraft}
                    style={styles.button}
                >
                    Save Draft
                </Button>
                <Button onClick={cancelPost} style={styles.button}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

const styles = {
    button: {
        marginRight: 10,
    },
    formField: {
        marginTop: 20,
    },
};
