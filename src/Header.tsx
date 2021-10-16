import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { rtaGetCurrentUser } from "./api";
import { useStore } from "./store/zstore";
import Button from "@mui/material/Button";

export const Header = () => {
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const accessToken = useStore((state) => state.accessToken);
    const setLndToken = useStore((state) => state.setLndToken);

    useEffect(() => {
        if (!user) {
            rtaGetCurrentUser(accessToken).then((res) => {
                if (res && typeof res === "object") {
                    setUser(res);
                    setLndToken(res.node?.token);
                }
            });
        }
    }, [user, accessToken]);

    return (
        <div
            id="app-header"
            style={styles.headerContainer as React.CSSProperties}
        >
            <Link to="/" style={styles.link}>
                <Button>Brainstorm Press</Button>
            </Link>
            {!user && (
                <Link to="/authenticate" style={styles.link}>
                    <Button>Sign Up</Button>
                </Link>
            )}
            {user && (
                <>
                    <Link to="/posts/new" style={styles.link}>
                        <Button>New Post</Button>
                    </Link>
                    <Link to="/posts/drafts" style={styles.link}>
                        <Button>Drafts</Button>
                    </Link>
                    <Link to="/settings" style={styles.link}>
                        <Button>Settings</Button>
                    </Link>
                    <Link
                        to={{ pathname: "/", state: { logout: true } }}
                        style={styles.link}
                    >
                        <Button>Logout</Button>
                    </Link>
                </>
            )}
        </div>
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
        paddingTop: 10,
        paddingBottom: 10,
    },
    link: {
        textDecoration: "none",
    },
};
