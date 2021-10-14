import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { rtaGetCurrentUser } from "./api";
import { useStore } from "./store/zstore";

export const Header = () => {
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const accessToken = useStore((state) => state.accessToken);
    const setLndToken = useStore((state) => state.setLndToken);

    useEffect(() => {
        if (!user) {
            rtaGetCurrentUser(accessToken).then((res) => {
                if (typeof res === "object") {
                    setUser(res);
                    setLndToken(res.node.token);
                }
            });
        }
    }, [user, accessToken]);

    return (
        <div
            id="app-header"
            style={styles.headerContainer as React.CSSProperties}
        >
            <Link to="/">Brainstorm Press</Link>
            {!user && <Link to="/authenticate">Sign Up</Link>}
            {user && <Link to="/posts/new">New Post</Link>}
            {user && <Link to="/settings">Settings</Link>}
            {user && (
                <Link to={{ pathname: "/", state: { logout: true } }}>
                    Logout
                </Link>
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
    },
};
