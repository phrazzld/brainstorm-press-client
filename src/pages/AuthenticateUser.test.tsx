import { render, screen } from "@testing-library/react";
import React from "react";
import { AuthenticateUser } from "./AuthenticateUser";

describe("<AuthenticateUser authType />", () => {
    describe("Sign Up", () => {
        beforeEach(() => {
            render(<AuthenticateUser authType="SIGNUP" />);
        });

        test("renders signup form", () => {
            render(<AuthenticateUser authType="SIGNUP" />);
            const buttonElements = screen.getAllByRole('button', { name: 'Submit' });
            expect(buttonElements[0]).toBeInTheDocument();
        });
    });

    describe("Login", () => {
        beforeEach(() => {
            render(<AuthenticateUser authType="LOGIN" />);
        });

        test("renders login form", () => {
            render(<AuthenticateUser authType="LOGIN" />);
            const buttonElements = screen.getAllByRole('button', { name: 'Submit' });
            expect(buttonElements[0]).toBeInTheDocument();
        });
    });
});
