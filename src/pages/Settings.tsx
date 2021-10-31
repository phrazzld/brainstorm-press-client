import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { validate } from "bitcoin-address-validation";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAccessToken } from "../hooks/useAccessToken";
import { useNodeInfo } from "../hooks/useNodeInfo";
import { useStore } from "../store/zstore";
import { disconnectNode, rtaDeleteUser, rtaUpdateUser } from "../utils/api";
import { NodeInfo } from "../utils/types";

export const Settings = () => {
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const accessToken = useAccessToken();
    const setAccessToken = useStore((state) => state.setAccessToken);
    const lndToken = useStore((state) => state.lndToken);
    const setLndToken = useStore((state) => state.setLndToken);

    const [redirect, setRedirect] = useState<string>("");

    const [blogInputValue, setBlogInputValue] = useState<string>(
        user?.blog || ""
    );
    const [btcAddressInputValue, setBtcAddressInputValue] = useState<string>(
        user?.btcAddress || ""
    );
    const [btcAddressInputInvalid, setBtcAddressInputInvalid] = useState<
        boolean
    >(false);

    const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState<
        boolean
    >(false);

    const nodeInfo: NodeInfo | null = useNodeInfo(lndToken);

    const handleBlogInputChange = (event: any): void => {
        setBlogInputValue(event.target.value);
    };

    const handleBtcAddressInputChange = (event: any): void => {
        setBtcAddressInputValue(event.target.value);
    };

    const confirmAccountDeletion = (): void => {
        setShowDeleteAccountDialog(true);
    };

    const deleteAccount = async (): Promise<void> => {
        if (!user) {
            throw new Error("Cannot delete user if no user is present.");
        }

        await rtaDeleteUser(user._id, accessToken);
        setUser(null);
        setAccessToken("");
        setLndToken("");
        setRedirect("/");
    };

    const submitEdits = (): void => {
        if (user) {
            // Validate input
            if (validate(btcAddressInputValue)) {
                setBtcAddressInputInvalid(false);
                const body = {
                    blog: blogInputValue,
                    btcAddress: btcAddressInputValue,
                };
                rtaUpdateUser(user._id, body, accessToken);
            } else {
                setBtcAddressInputInvalid(true);
            }
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

    return (
        <div id="settings-container">
            <Typography variant="h1" gutterBottom>
                Settings
            </Typography>

            <Typography
                variant="body1"
                component="div"
                style={{ marginBottom: 20 }}
                gutterBottom
            >
                Welcome {user?.username}
            </Typography>

            <TextField
                id="edit-blog-title"
                label="Blog"
                variant="outlined"
                onChange={handleBlogInputChange}
                value={blogInputValue}
                fullWidth
            />

            <br />
            <br />

            {btcAddressInputInvalid && (
                <TextField
                    error
                    id="edit-btc-address-invalid"
                    label="BTC Address"
                    variant="outlined"
                    onChange={handleBtcAddressInputChange}
                    value={btcAddressInputValue}
                    helperText="Invalid BTC address"
                    fullWidth
                />
            )}

            {!btcAddressInputInvalid && (
                <TextField
                    id="edit-btc-address"
                    label="BTC Address"
                    variant="outlined"
                    onChange={handleBtcAddressInputChange}
                    value={btcAddressInputValue}
                    fullWidth
                />
            )}

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

            <br />
            <br />

            <Button
                variant="outlined"
                color="error"
                onClick={confirmAccountDeletion}
            >
                Delete Account
            </Button>

            <Dialog
                open={showDeleteAccountDialog}
                onClose={() => setShowDeleteAccountDialog(false)}
            >
                <DialogTitle>
                    Are you sure you want to delete your account?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deleting your account permanently deletes all of your
                        user data, including your posts, Lightning node data,
                        and all transaction records.
                    </DialogContentText>
                    <DialogActions>
                        <Button
                            onClick={() => setShowDeleteAccountDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={deleteAccount}>Delete Account</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};
