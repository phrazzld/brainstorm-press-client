import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useStore } from "../store/zstore";
import { rtaConnectToLn } from "../utils/api";

export const ConnectToLnForm = () => {
    const [hostInputValue, setHostInputValue] = useState<string>("");
    const [certInputValue, setCertInputValue] = useState<string>("");
    const [macaroonInputValue, setMacaroonInputValue] = useState<string>("");

    const accessToken = useStore((state) => state.accessToken);
    const setLnToken = useStore((state) => state.setLnToken);

    const [redirect, setRedirect] = useState<string>("");

    const handleHostInputChange = (event: any): void => {
        setHostInputValue(event.target.value);
    };

    const handleCertInputChange = (event: any): void => {
        setCertInputValue(event.target.value);
    };

    const handleMacaroonInputChange = (event: any): void => {
        setMacaroonInputValue(event.target.value);
    };

    const connectToLn = async (): Promise<void> => {
        const body = {
            host: hostInputValue,
            cert: certInputValue,
            macaroon: macaroonInputValue,
        };
        const res = await rtaConnectToLn(body, accessToken);
        setLnToken(res.token);
        setRedirect("/settings");
    };

    const cancel = (): void => {
        setRedirect("/settings");
    };

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return (
        <div id="connect-to-ln-form">
            <div id="host-input-container">
                <TextField
                    id="host"
                    label="Host"
                    variant="filled"
                    onChange={handleHostInputChange}
                    value={hostInputValue}
                    style={styles.formField}
                    fullWidth
                    required
                />
            </div>
            <div id="cert-input-container">
                <TextField
                    id="tls-hex-cert"
                    label="TLS Certificate (HEX)"
                    variant="filled"
                    value={certInputValue}
                    onChange={handleCertInputChange}
                    style={styles.formField}
                    maxRows={5}
                    multiline
                    fullWidth
                    required
                />
            </div>
            <div id="macaroon-input-container">
                <TextField
                    id="macaroon"
                    label="Macaroon"
                    variant="filled"
                    value={macaroonInputValue}
                    onChange={handleMacaroonInputChange}
                    style={styles.formField}
                    multiline
                    fullWidth
                    required
                />

                <Typography variant="subtitle1" gutterBottom>
                    lncli bakemacaroon info:read offchain:read invoices:read
                    invoices:write
                </Typography>
            </div>
            <div id="connect-to-ln-submit-container">
                <Button
                    variant="contained"
                    onClick={connectToLn}
                    style={styles.button}
                >
                    Submit
                </Button>
                <Button
                    variant="outlined"
                    onClick={cancel}
                    style={styles.button}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

const styles = {
    button: {
        marginRight: 10,
    },
    formField: {
        marginTop: 20,
    },
};
