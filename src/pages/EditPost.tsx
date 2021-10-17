import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useAccessToken } from "../hooks/useAccessToken";
import { usePost } from "../hooks/usePost";
import { rtaUpdatePost } from "../utils/api";
import { PostParams } from "../utils/types";

export const EditPost = () => {
    const { postId } = useParams<PostParams>();
    const post = usePost(postId);

    const [editing, setEditing] = useState(true);

    const [titleInputValue, setTitleInputValue] = useState<string>(
        post?.title || ""
    );
    const [contentInputValue, setContentInputValue] = useState<string>(
        post?.content || ""
    );
    const [priceInputValue, setPriceInputValue] = useState<number>(
        post?.price || 0
    );

    const accessToken = useAccessToken();

    useEffect(() => {
        if (post) {
            setTitleInputValue(post.title);
            setContentInputValue(post.content);
            setPriceInputValue(post.price);
        }
    }, [post]);

    const cancelEdits = (): void => {
        setEditing(false);
    };

    const submitEdits = async (): Promise<void> => {
        if (!post) {
            throw new Error("Cannot find post to edit.");
        }

        const body = {
            title: titleInputValue,
            content: contentInputValue,
            price: priceInputValue,
            published: post.published,
        };
        await rtaUpdatePost(post._id, body, accessToken);
        setEditing(false);
    };

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

    if (!post) {
        return (
            <>
                <Typography variant="h1" gutterBottom>
                    <Skeleton />
                </Typography>
                <Typography variant="h2" gutterBottom>
                    <Skeleton />
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </Typography>
            </>
        );
    }

    if (!editing) {
        return <Redirect to={`/posts/${post._id}`} />;
    }

    return (
        <div id="edit-post-form">
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
                    onClick={submitEdits}
                    style={styles.button}
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    onClick={cancelEdits}
                    style={styles.button}
                >
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
