import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../store/zstore";
import { rtaGetCurrentUser } from "../utils/api";

export const Header = () => {
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const accessToken = useStore((state) => state.accessToken);
    const setLnToken = useStore((state) => state.setLnToken);
    const location = useLocation();

    const showLogin: boolean =
        !["/signup", "/login"].includes(location.pathname) && !user;

    useEffect(() => {
        if (!user) {
            rtaGetCurrentUser(accessToken).then((res) => {
                if (res && typeof res === "object") {
                    setUser(res);
                    setLnToken(res.node?.token || "");
                }
            });
        }
    }, [user, accessToken, setLnToken, setUser]);

    return (
        <Box style={styles.headerContainer as React.CSSProperties}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Link to="/" style={styles.link}>
                            Brainstorm Press
                        </Link>
                    </Typography>
                    {user && (
                        <>
                            <Link to="/posts/new" style={styles.link}>
                                <Tooltip title="Create">
                                    <IconButton
                                        id="create-post-header-button"
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="new-post"
                                    >
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            <Link to="/subscriptions" style={styles.link}>
                                <Tooltip title="Subscriptions">
                                    <IconButton
                                        id="subs-header-button"
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="subscriptions"
                                    >
                                        <FileCopyOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            <Link to="/profile" style={styles.link}>
                                <Tooltip title="Profile">
                                    <IconButton
                                        id="profile-header-button"
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        aria-label="settings"
                                    >
                                        <AccountCircleOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </>
                    )}
                    {showLogin && (
                        <Link to="/login" style={styles.link}>
                            <Button color="inherit">Login</Button>
                        </Link>
                    )}
                    {user && (
                        <Link
                            to={{ pathname: "/", state: { logout: true } }}
                            style={styles.link}
                        >
                            <Tooltip title="Logout">
                                <IconButton
                                    id="logout-header-button"
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="logout"
                                >
                                    <LogoutIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

const styles = {
    headerContainer: {
        display: "flex",
        // Requires use with "as React.CSSProperties" because "row" is cast as a string
        // and cannot be coerced into the string literal matching FlexDirectionProperty
        // https://github.com/cssinjs/jss/issues/1344
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10,
        flexGrow: 1,
        position: "sticky",
        top: 0,
        zIndex: 100,
        marginBottom: 20,
    },
    link: {
        textDecoration: "none",
        color: "inherit",
        marginRight: 20,
    },
};
