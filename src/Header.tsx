import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "./store/zstore";

export const Header = () => {
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);

    const logout = (): void => {
        setUser(null);
    };

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
                <a href="#" onClick={logout}>
                    Logout
                </a>
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
