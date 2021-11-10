import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { SignUp } from "./SignUp";

describe("<SignUp />", () => {
    beforeEach(() => {
        render(<SignUp />);
    });

    it("should have a title", () => {
        expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });

    it("should have an email input", () => {
        expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("should have a username input", () => {
        expect(screen.getByText("Username")).toBeInTheDocument();
    });

    it("should have a password input", () => {
        expect(screen.getByText("Password")).toBeInTheDocument();
    });

    it("should change email input value when you type into it", () => {
        const emailInput = screen.getByRole("textbox", {
            name: /email/i,
        }) as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: "test@test.net" } });
        expect(emailInput.value).toBe("test@test.net");
    });

    it("should change username input value when you type into it", () => {
        const usernameInput = screen.getByRole("textbox", {
            name: /username/i,
        }) as HTMLInputElement;
        fireEvent.change(usernameInput, { target: { value: "test" } });
        expect(usernameInput.value).toBe("test");
    });

    it("should not allow special characters to be entered into the username field", () => {
        const usernameInput = screen.getByRole("textbox", {
            name: /username/i,
        }) as HTMLInputElement;
        fireEvent.change(usernameInput, {
            target: { value: "testing@wild!user#names" },
        });
        expect(usernameInput.value).toBe("testingwildusernames");
    });

    it("should change password input value when you type into it", () => {
        const passwordInput = screen.getByTestId(
            "password"
        ) as HTMLInputElement;
        fireEvent.change(passwordInput, { target: { value: "test" } });
        expect(passwordInput.value).toBe("test");
    });
});
