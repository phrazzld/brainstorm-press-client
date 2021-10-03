import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "./store/zstore";
import { useLndToken } from "./useLndToken";
import { NodeInfo, useNodeInfo } from "./useNodeInfo";

export const Header = () => {
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);

    const lndToken = useLndToken(user);

    const nodeInfo: NodeInfo | null = useNodeInfo(lndToken);

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
            {!nodeInfo && user && (
                <Link to="/connect-to-lnd">Connect to LND</Link>
            )}
            {user && <Link to="/posts/new">New Post</Link>}
            {user && (
                <a href="#" onClick={logout}>
                    Logout
                </a>
            )}
            {nodeInfo && <p>Balance: {nodeInfo.balance} sats</p>}
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
