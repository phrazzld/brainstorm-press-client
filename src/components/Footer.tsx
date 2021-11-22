import GitHubIcon from "@mui/icons-material/GitHub";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer style={styles.footer as React.CSSProperties}>
            <Typography variant="overline" style={{ fontSize: "0.5rem" }}>
                <Tooltip title="Source code">
                    <a
                        href="https://github.com/phrazzld/brainstorm-press-client"
                        style={{ textDecoration: "none" }}
                    >
                        <IconButton
                            id="source-code"
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="source-code"
                            style={styles.footerButton}
                        >
                            <GitHubIcon />
                        </IconButton>
                    </a>
                </Tooltip>

                <Tooltip title="Contact us">
                    <a
                        href="https://twitter.com/phrazzld"
                        style={{ textDecoration: "none" }}
                    >
                        <IconButton
                            id="contact-us"
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="contact-us"
                            style={styles.footerButton}
                        >
                            <TwitterIcon />
                        </IconButton>
                    </a>
                </Tooltip>

                <Tooltip title="FAQ">
                    <Link to="/faq" style={{ textDecoration: "none" }}>
                        <IconButton
                            id="faq"
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="faq"
                            style={styles.footerButton}
                        >
                            <HelpOutlineIcon />
                        </IconButton>
                    </Link>
                </Tooltip>
            </Typography>
        </footer>
    );
};

const styles = {
    footer: {
        position: "fixed",
        width: "100%",
        bottom: 0,
        textAlign: "center",
        height: "2rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        borderTop: "1px solid #e0e0e0",
        marginTop: "1rem",
        backgroundColor: "#fafafa",
    },
    footerButton: {
        color: "#1976d2",
        marginRight: "2rem",
    },
};
