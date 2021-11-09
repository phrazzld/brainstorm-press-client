import { render, screen } from "@testing-library/react";
import React from "react";
import { PriceChip } from "./PriceChip";

describe("<PriceChip />", () => {
    test("render 'Free' when premium is false", () => {
        render(<PriceChip premium={false} />);
        expect(screen.getByText("Free")).toBeInTheDocument();
    });

    test("render 'Premium' when premium is true", () => {
        render(<PriceChip premium={true} />);
        expect(screen.getByText("Premium")).toBeInTheDocument();
    });
});
