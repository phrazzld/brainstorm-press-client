import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNodeInfo } from "../hooks/useNodeInfo";
import { useStore } from "../store/zstore";
import { disconnectNode, rtaUpdateUser } from "../utils/api";
import { NodeInfo } from "../utils/types";

export const Settings = () => {
    const user = useStore((state) => state.user);
    const accessToken = useStore((state) => state.accessToken);
    const lndToken = useStore((state) => state.lndToken);
    const setLndToken = useStore((state) => state.setLndToken);

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
    }, [user]);

    // TODO: enable account deletion
    // TODO: enable editing name
    // TODO: enable adding email (for account recovery)
    return (
        <div id="settings-container">
            <h2>Settings</h2>
            <div id="account-container">
                <p>Welcome {user?.name}</p>
                <div className="form-text-input">
                    <label>Blog Name: </label>
                    <input
                        type="text"
                        name="blog"
                        value={blogInputValue}
                        onChange={handleBlogInputChange}
                    />
                    <div id="submit-edits">
                        <button onClick={submitEdits}>Save Changes</button>
                    </div>
                </div>
            </div>
            <div id="lnd-container">
                <div id="lnd-info-container"></div>
                <div id="lnd-actions-container">
                    {nodeInfo && (
                        <p>
                            Balance: {Number(nodeInfo.balance).toLocaleString()}{" "}
                            sats
                        </p>
                    )}
                    {!lndToken && (
                        <Link to="/connect-to-lnd">Connect to LND</Link>
                    )}
                    {lndToken && (
                        <a
                            href="#"
                            onClick={() => {
                                disconnectNode(lndToken);
                                setLndToken("");
                            }}
                        >
                            Disconnect Node
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
