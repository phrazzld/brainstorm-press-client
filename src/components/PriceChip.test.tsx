import { render, screen } from "@testing-library/react";
import React from "react";
import { PriceChip } from "./PriceChip";

describe("<PriceChip />", () => {
    it("should render 'Free' when premium is false", () => {
        render(<PriceChip premium={false} />);
        expect(screen.getByText("Free")).toBeInTheDocument();
    });

    it("should render 'Premium' when premium is true", () => {
        render(<PriceChip premium={true} />);
        expect(screen.getByText("Premium")).toBeInTheDocument();
    });
});
