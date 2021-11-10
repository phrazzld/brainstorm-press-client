import { render, screen } from "@testing-library/react";
import React from "react";
import { PostsFilter } from "./PostsFilter";

describe("<PostsFilter />", () => {
    beforeEach(() => {
        render(
            <PostsFilter onFreeChanged={() => {}} onSearchChanged={() => {}} />
        );
    });

    it("should render search bar", () => {
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    it("should render filter for free posts", () => {
        expect(screen.getByText("Free")).toBeInTheDocument();
    });
});
