import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useStore } from "../store/zstore";
import { createUser, loginUser } from "../utils/api";

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

type AuthType = "SIGNUP" | "LOGIN";

interface IAuthenticateUser {
    authType: AuthType;
}

export const AuthenticateUser = (props: IAuthenticateUser) => {
    const { authType } = props;
    const [authForm, setAuthForm] = useState<AuthType>(authType);
    const [formHeader, setFormHeader] = useState<string>(
        authForm === "SIGNUP" ? "Sign Up" : "Login"
    );
    const [nameInputValue, setNameInputValue] = useState<string>("");
    const [passwordInputValue, setPasswordInputValue] = useState<string>("");

    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const setAccessToken = useStore((state) => state.setAccessToken);
    const setLndToken = useStore((state) => state.setLndToken);

    const handleNameInputChange = (event: any): void => {
        setNameInputValue(event.target.value);
    };

    const handlePasswordInputChange = (event: any): void => {
        setPasswordInputValue(event.target.value);
    };

    const useLoginForm = (): void => {
        setAuthForm("LOGIN");
    };

    const useSignUpForm = (): void => {
        setAuthForm("SIGNUP");
    };

    useEffect(() => {
        if (authForm === "SIGNUP") {
            setFormHeader("Sign Up");
        } else if (authForm === "LOGIN") {
            setFormHeader("Login");
        }
    }, [authForm]);

    const signupUser = async (): Promise<void> => {
        const body = {
            name: nameInputValue,
            password: passwordInputValue,
            blog: `${nameInputValue}'s Blog`,
        };
        const response = await createUser(body);
        setUser(response.user);
        setAccessToken(response.accessToken);
    };

    const login = async (): Promise<void> => {
        const body = {
            name: nameInputValue,
            password: passwordInputValue,
        };
        const response = await loginUser(body);
        setUser(response.user);
        setAccessToken(response.accessToken);
        if (response.user.node) {
            setLndToken(response.user.node.token);
        }
    };

    const submitForm = (): void => {
        if (authForm === "SIGNUP") {
            signupUser();
        } else if (authForm === "LOGIN") {
            login();
        }
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div id="signup-container">
            <FormHeader text={formHeader} />
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
            <div id="submit-auth">
                <button name="Submit" onClick={submitForm}>
                    Submit
                </button>
            </div>
            {authForm === "SIGNUP" && (
                <div id="login-redirect">
                    <p>Already have an account?</p>
                    <button onClick={useLoginForm}>Login</button>
                </div>
            )}
            {authForm === "LOGIN" && (
                <div id="signup-redirect">
                    <p>Don't have an account?</p>
                    <button onClick={useSignUpForm}>Sign Up</button>
                </div>
            )}
        </div>
    );
};
