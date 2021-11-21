import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BoltIcon from "@mui/icons-material/Bolt";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useNodeInfo } from "../hooks/useNodeInfo";
import { useStore } from "../store/zstore";
import { Colors } from "../utils/Colors";
import { numberWithCommas } from "../utils/format";
import { NodeInfo } from "../utils/types";

export const Profile = () => {
    const user = useStore((state) => state.user);
    const lnToken = useStore((state) => state.lnToken);
    const [redirect, setRedirect] = useState<string>("");
    const nodeInfo: NodeInfo | null = useNodeInfo(lnToken);

    const NodeStatusChip = () => {
        return (
            <Chip
                icon={<BoltIcon />}
                label={
                    !!nodeInfo
                        ? "Lightning node connected"
                        : "Lightning node not connected"
                }
                color={!!nodeInfo ? "success" : "error"}
                variant="outlined"
            />
        );
    };

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return (
        <div id="settings-container">
            <Typography variant="h3" gutterBottom>
                Welcome, {user?.username}.
            </Typography>

            <NodeStatusChip />

            <br />
            <br />

            {!!nodeInfo && (
                <Chip
                    icon={
                        <FontAwesomeIcon
                            style={{
                                fontSize: 22,
                                color: Colors.btcOrange,
                            }}
                            icon={faBitcoin}
                        />
                    }
                    label={`Balance: ${numberWithCommas(
                        nodeInfo?.balance || 0
                    )} sats`}
                    color="warning"
                    variant="outlined"
                />
            )}

            <Box
                style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 30,
                }}
            >
                <Button
                    onClick={() => setRedirect("/drafts")}
                    style={{ marginRight: 10 }}
                >
                    Drafts
                </Button>
                <Button onClick={() => setRedirect("/settings")}>
                    Settings
                </Button>
            </Box>
        </div>
    );
};
