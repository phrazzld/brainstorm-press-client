import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { validate } from "bitcoin-address-validation";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAccessToken } from "../hooks/useAccessToken";
import { useStore } from "../store/zstore";
import { disconnectNode, rtaDeleteUser, rtaUpdateUser } from "../utils/api";

export const Settings = () => {
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const accessToken = useAccessToken();
    const setAccessToken = useStore((state) => state.setAccessToken);
    const lnToken = useStore((state) => state.lnToken);
    const setLnToken = useStore((state) => state.setLnToken);

    const [saved, setSaved] = useState(false);

    const [redirect, setRedirect] = useState<string>("");

    const [email, setEmail] = useState<string>(user?.email || "");
    const [blogTitle, setBlogTitle] = useState<string>(user?.blog || "");
    const [btcAddress, setBtcAddress] = useState<string>(
        user?.btcAddress || ""
    );
    const [subscriptionPrice, setSubscriptionPrice] = useState<number>(
        user?.subscriptionPrice || 0
    );

    const [btcAddressInvalid, setBtcAddressInvalid] = useState<boolean>(false);

    const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState<
        boolean
    >(false);

    const handleEmailChange = (event: any): void => {
        setEmail(event.target.value);
    };

    const handleBlogInputChange = (event: any): void => {
        setBlogTitle(event.target.value);
    };

    const handleBtcAddressInputChange = (event: any): void => {
        setBtcAddress(event.target.value);
    };

    const handleSubscriptionPriceChange = (event: any): void => {
        const newPrice: number = parseInt(event.target.value, 10) || 0;
        setSubscriptionPrice(newPrice);
    };

    const promptToDeleteAccount = (): void => {
        setShowDeleteAccountDialog(true);
    };

    const deleteAccount = async (): Promise<void> => {
        if (!user) {
            throw new Error("Cannot delete user if no user is present.");
        }

        await rtaDeleteUser(user._id, accessToken);
        setUser(null);
        setAccessToken("");
        setLnToken("");
        setRedirect("/");
    };

    const submitEdits = (): void => {
        let res;
        if (user) {
            if (btcAddress && !validate(btcAddress)) {
                setBtcAddressInvalid(true);
            } else if (btcAddress && validate(btcAddress)) {
                setBtcAddressInvalid(false);
                const body = {
                    email: email,
                    blog: blogTitle,
                    subscriptionPrice: subscriptionPrice,
                    btcAddress: btcAddress,
                };
                res = rtaUpdateUser(user._id, body, accessToken);
            } else {
                const body = {
                    email: email,
                    blog: blogTitle,
                    subscriptionPrice: subscriptionPrice,
                };
                res = rtaUpdateUser(user._id, body, accessToken);
            }
        }
        if (res) {
            setSaved(true);
        }
    };

    useEffect(() => {
        if (!blogTitle && user?.blog) {
            setBlogTitle(user?.blog);
        }
        if (!email && user?.email) {
            setEmail(user?.email);
        }
        if (!subscriptionPrice && user?.subscriptionPrice) {
            setSubscriptionPrice(user?.subscriptionPrice);
        }
    }, [user, blogTitle, email, subscriptionPrice]);

    const goToConnectToLn = (): void => {
        setRedirect("/connect-to-ln");
    };

    const closeSnackbarAction = (
        <IconButton
            size="small"
            onClick={() => setSaved(false)}
            color="inherit"
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return (
        <div id="settings-container">
            <Typography variant="h3" gutterBottom>
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
                id="edit-email"
                label="Email"
                variant="outlined"
                onChange={handleEmailChange}
                value={email}
                fullWidth
            />

            <br />
            <br />

            <TextField
                id="edit-blog-title"
                label="Blog"
                variant="outlined"
                onChange={handleBlogInputChange}
                value={blogTitle}
                fullWidth
            />

            <br />
            <br />

            <Tooltip title="Monthly price readers pay to access your premium posts">
                <TextField
                    id="edit-subscription-price"
                    label="Premium Pass Price (sats)"
                    variant="outlined"
                    onChange={handleSubscriptionPriceChange}
                    value={subscriptionPrice}
                    fullWidth
                />
            </Tooltip>

            <br />
            <br />

            {btcAddressInvalid && (
                <TextField
                    error
                    id="edit-btc-address-invalid"
                    label="BTC Address"
                    variant="outlined"
                    onChange={handleBtcAddressInputChange}
                    value={btcAddress}
                    helperText="Invalid BTC address"
                    fullWidth
                />
            )}

            {!btcAddressInvalid && (
                <TextField
                    id="edit-btc-address"
                    label="BTC Address"
                    variant="outlined"
                    onChange={handleBtcAddressInputChange}
                    value={btcAddress}
                    fullWidth
                />
            )}

            <br />
            <br />

            <Box style={{ display: "flex", flex: 1, flexDirection: "row" }}>
                <Button
                    variant="contained"
                    onClick={submitEdits}
                    style={{ marginRight: 15 }}
                >
                    Save Changes
                </Button>

                {!lnToken && (
                    <Button
                        variant="outlined"
                        onClick={goToConnectToLn}
                        style={{ marginRight: 15 }}
                    >
                        Connect to Lightning
                    </Button>
                )}

                {lnToken && (
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            disconnectNode(lnToken);
                            setLnToken("");
                        }}
                        style={{ marginRight: 15 }}
                    >
                        Disconnect Lightning Node
                    </Button>
                )}

                <Button
                    id="prompt-to-delete-account"
                    variant="outlined"
                    color="error"
                    onClick={promptToDeleteAccount}
                    style={{ marginRight: 15 }}
                >
                    Delete Account
                </Button>
            </Box>

            <Snackbar
                open={saved}
                autoHideDuration={3000}
                onClose={() => setSaved(false)}
                message="Saved changes successfully."
                action={closeSnackbarAction}
            />

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
                        <Button id="delete-account" onClick={deleteAccount}>
                            Delete Account
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};
