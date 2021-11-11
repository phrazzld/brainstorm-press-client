import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { LogIn } from "./LogIn";

describe("<LogIn />", () => {
    beforeEach(() => {
        render(<LogIn />);
    });

    describe("presence", () => {
        it("should render the title", () => {
            expect(screen.getByText("Log In")).toBeInTheDocument();
        });

        it("should render the email input", () => {
            expect(screen.getByText("Email")).toBeInTheDocument();
        });

        it("should render the password input", () => {
            expect(screen.getByText("Password")).toBeInTheDocument();
        });

        it("should render the login button", () => {
            expect(
                screen.getByRole("button", { name: "Log In" })
            ).toBeInTheDocument();
        });

        it("should render the sign up link", () => {
            expect(
                screen.getByText("Don't have an account? Sign Up")
            ).toBeInTheDocument();
        });

        it("should render the forgot password link", () => {
            expect(screen.getByText("Forgot password?")).toBeInTheDocument();
        });
    });

    describe("behavior", () => {
        it("should change email input value when you type into it", () => {
            const emailInput = screen.getByRole("textbox", {
                name: "Email",
            }) as HTMLInputElement;
            fireEvent.change(emailInput, {
                target: { value: "test@test.net" },
            });
            expect(emailInput.value).toBe("test@test.net");
        });

        it("should change password input value when you type into it", () => {
            const passwordInput = screen.getByTestId(
                "password"
            ) as HTMLInputElement;
            fireEvent.change(passwordInput, { target: { value: "test" } });
            expect(passwordInput.value).toBe("test");
        });
    });
});
