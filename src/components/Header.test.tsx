import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

describe("<Header />", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
    });

    test('renders "Login" link', () => {
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });
});
