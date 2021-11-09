import { render, screen } from "@testing-library/react";
import React from "react";
import { PostsFilter } from "./PostsFilter";

describe("<PostsFilter />", () => {
    beforeEach(() => {
        render(
            <PostsFilter onFreeChanged={() => {}} onSearchChanged={() => {}} />
        );
    });

    test("render search bar", () => {
        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    test("render filter for free posts", () => {
        expect(screen.getByText("Free")).toBeInTheDocument();
    });
});
