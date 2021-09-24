import React, { useState } from "react";

interface IFormHeader {
    text: string;
}

const FormHeader = (props: IFormHeader) => {
    const { text } = props;

    return (
        <div id="form-header">
            <h2>{text}</h2>
        </div>
    );
};

export const SignUp = () => {
    const [nameInputValue, setNameInputValue] = useState<string>("");
    const [passwordInputValue, setPasswordInputValue] = useState<string>("");

    const handleNameInputChange = (event: any): void => {
        setNameInputValue(event.target.value);
    };

    const handlePasswordInputChange = (event: any): void => {
        setPasswordInputValue(event.target.value);
    };

    const signupUser = async (): Promise<void> => {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nameInputValue,
                password: passwordInputValue,
                blog: `${nameInputValue}'s Blog`
            })
        })
        const resJSON = await response.json()
        console.log("resJSON:", resJSON)
        const jwtToken = resJSON.jwtToken
        // TODO: save token in memory
    }

    return (
        <div id="signup-container">
            <FormHeader text="Sign Up" />
            <div className="form-text-input">
                <label>Name: </label>
                <input
                    type="text"
                    name="name"
                    value={nameInputValue}
                    onChange={handleNameInputChange}
                    required
                />
            </div>
            <div className="form-text-input">
                <label>Password: </label>
                <input
                    type="password"
                    name="password"
                    value={passwordInputValue}
                    onChange={handlePasswordInputChange}
                    required
                />
            </div>
            <div id="submit-signup">
                <button onClick={signupUser}>Submit</button>
            </div>
        </div>
    );
};
