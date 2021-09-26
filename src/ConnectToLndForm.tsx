import React, { useState } from "react";

export const ConnectToLndForm = () => {
    const [hostInputValue, setHostInputValue] = useState<string>("");
    const [certInputValue, setCertInputValue] = useState<string>("");
    const [macaroonInputValue, setMacaroonInputValue] = useState<string>("");

    const handleHostInputChange = (event: any): void => {
        setHostInputValue(event.target.value);
    };

    const handleCertInputChange = (event: any): void => {
        setCertInputValue(event.target.value);
    };

    const handleMacaroonInputChange = (event: any): void => {
        setMacaroonInputValue(event.target.value);
    };

    const connectToLnd = async (): Promise<void> => {
        const response = await fetch("/api/connect", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                host: hostInputValue,
                cert: certInputValue,
                macaroon: macaroonInputValue,
            }),
        });
        const resJSON = await response.json()
        console.log("resJSON:", resJSON)
    };

    return (
        <div id="connect-to-lnd-form">
            <div id="host-input-container">
                <p>LND Host:</p>
                <input
                    type="text"
                    name="host"
                    value={hostInputValue}
                    onChange={handleHostInputChange}
                    required
                />
            </div>
            <div id="cert-input-container">
                <p>TLS Certificate:</p>
                <textarea
                    value={certInputValue}
                    onChange={handleCertInputChange}
                    rows={3}
                />
            </div>
            <div id="macaroon-input-container">
                <p>Macaroon:</p>
                <textarea
                    value={macaroonInputValue}
                    onChange={handleMacaroonInputChange}
                    rows={3}
                />
                <p className="reminder-text">lncli bakemacaroon info:read offchain:read invoices:read invoices:write message:read message:write</p>
            </div>
            <div id="connect-to-lnd-submit-container">
                <button onClick={connectToLnd}>Submit</button>
            </div>
        </div>
    );
};