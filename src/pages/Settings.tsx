import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAccessToken } from "../hooks/useAccessToken";
import { useNodeInfo } from "../hooks/useNodeInfo";
import { useStore } from "../store/zstore";
import { disconnectNode, rtaUpdateUser } from "../utils/api";
import { NodeInfo } from "../utils/types";

export const Settings = () => {
    const user = useStore((state) => state.user);
    const accessToken = useAccessToken();
    const lndToken = useStore((state) => state.lndToken);
    const setLndToken = useStore((state) => state.setLndToken);

    const [redirect, setRedirect] = useState<string>("");

    const [blogInputValue, setBlogInputValue] = useState<string>(
        user?.blog || ""
    );

    const nodeInfo: NodeInfo | null = useNodeInfo(lndToken);

    const handleBlogInputChange = (event: any): void => {
        setBlogInputValue(event.target.value);
    };

    const submitEdits = (): void => {
        if (user) {
            const body = {
                blog: blogInputValue,
            };
            rtaUpdateUser(user._id, body, accessToken);
        }
    };

    useEffect(() => {
        if (!blogInputValue && user?.blog) {
            setBlogInputValue(user?.blog);
        }
    }, [user, blogInputValue]);

    const goToConnectToLND = (): void => {
        setRedirect("/connect-to-lnd");
    };

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    // TODO: enable account deletion
    // TODO: enable editing name
    // TODO: enable adding email (for account recovery)
    return (
        <div id="settings-container">
            <Typography variant="h1" gutterBottom>
                Settings
            </Typography>

            <Typography variant="body1" gutterBottom>
                Welcome {user?.username}
            </Typography>

            <TextField
                id="edit-blog-title"
                label="Blog"
                variant="filled"
                onChange={handleBlogInputChange}
                value={blogInputValue}
                required
            />

            <br />
            <br />

            <Button variant="contained" onClick={submitEdits}>
                Save Changes
            </Button>

            <br />
            <br />

            {nodeInfo && (
                <Typography variant="body1" gutterBottom>
                    Balance: {Number(nodeInfo.balance).toLocaleString()} sats
                </Typography>
            )}

            {!lndToken && (
                <Button variant="outlined" onClick={goToConnectToLND}>
                    Connect to LND
                </Button>
            )}

            {lndToken && (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                        disconnectNode(lndToken);
                        setLndToken("");
                    }}
                >
                    Disconnect LND Node
                </Button>
            )}
        </div>
    );
};
