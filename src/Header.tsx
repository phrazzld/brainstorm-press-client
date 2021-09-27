import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "./store/zstore";
import { NodeInfo, useNodeInfo } from "./useNodeInfo";

export const Header = () => {
    const jwt: string = useStore((state) => state.jwt);

    const nodeInfo: NodeInfo | null = useNodeInfo();

    return (
        <div
            id="app-header"
            style={styles.headerContainer as React.CSSProperties}
        >
            <Link to="/">Brainstorm Press</Link>
            {!jwt && <Link to="/authenticate">Sign Up</Link>}
            {!nodeInfo && jwt && (
                <Link to="/connect-to-lnd">Connect to LND</Link>
            )}
            {jwt && <Link to="/posts/new">New Post</Link>}
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
