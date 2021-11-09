import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

describe("<App />", () => {
    beforeEach(() => {
        render(<App />);
    });

    test('renders "Brainstorm Press" link', () => {
        const linkElement = screen.getByText(/Brainstorm Press/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("renders login link", () => {
        const linkElement = screen.getByText(/Login/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('renders "No posts found" message', () => {
        const noPostsFound = screen.getByText(/No posts found/i);
        expect(noPostsFound).toBeInTheDocument();
    });
});
