import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "./store/zstore";
import { NodeInfo, useNodeInfo } from "./useNodeInfo";

export const Settings = () => {
    const user = useStore((state) => state.user);
    const lndToken = useStore((state) => state.lndToken);
    const setLndToken = useStore((state) => state.setLndToken);

    const nodeInfo: NodeInfo | null = useNodeInfo(lndToken);

    const disconnectNode = () => {
        fetch("/api/node", {
            method: "DELETE",
            headers: {
                Authorization: lndToken
            }
        })
        setLndToken("");
    };

    // TODO: enable account deletion
    // TODO: enable editing name and blogname
    // TODO: enable adding email (for account recovery)
    return (
        <div id="settings-container">
            <h2>Settings</h2>
            <div id="account-container">
                <p>Welcome {user?.name}</p>
            </div>
            <div id="lnd-container">
                <div id="lnd-info-container"></div>
                <div id="lnd-actions-container">
                    {nodeInfo && <p>Balance: {nodeInfo.balance} sats</p>}
                    {!lndToken && (
                        <Link to="/connect-to-lnd">Connect to LND</Link>
                    )}
                    {lndToken && (
                        <a href="#" onClick={disconnectNode}>
                            Disconnect Node
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
