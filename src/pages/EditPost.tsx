import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
    convertFromRaw,
    convertToRaw,
    DraftHandleValue,
    Editor,
    EditorState,
    RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useAccessToken } from "../hooks/useAccessToken";
import { usePost } from "../hooks/usePost";
import { rtaUpdatePost } from "../utils/api";
import { PostParams } from "../utils/types";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export const EditPost = () => {
    const { postId } = useParams<PostParams>();
    const post = usePost(postId);

    const [editing, setEditing] = useState(true);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const editor: any = React.useRef(null);
    const focusEditor = () => {
        editor?.current?.focus();
    };

    const [titleInputValue, setTitleInputValue] = useState<string>(
        post?.title || ""
    );
    const [premium, setPremium] = useState<boolean>(post?.premium || false);

    const accessToken = useAccessToken();

    useEffect(() => {
        if (post) {
            setTitleInputValue(post.title);
            setPremium(post.premium);
            setEditorState(
                EditorState.createWithContent(
                    convertFromRaw(JSON.parse(post.content))
                )
            );
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
            content: JSON.stringify(
                convertToRaw(editorState.getCurrentContent())
            ),
            premium: premium,
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

    const handleKeyCommand = (
        command: string,
        editorState: EditorState,
        eventTimeStamp: number
    ): DraftHandleValue => {
        const newEditorState = RichUtils.handleKeyCommand(editorState, command);

        if (newEditorState) {
            setEditorState(newEditorState);
            return "handled";
        }

        return "not-handled";
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

            <div
                style={{
                    minHeight: "6em",
                    cursor: "text",
                    marginTop: 20,
                    padding: 10,
                }}
                onClick={focusEditor}
            >
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={handleKeyCommand}
                    placeholder="Write something!"
                />
            </div>

            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={premium}
                            onChange={(event) =>
                                setPremium(event.target.checked)
                            }
                            name="premium"
                            color="primary"
                        />
                    }
                    label="Premium"
                />
            </FormGroup>

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
