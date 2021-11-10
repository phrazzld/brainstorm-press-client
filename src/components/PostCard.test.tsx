import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { formatDateString } from "../utils/time";
import { Post } from "../utils/types";
import { PostCard } from "./PostCard";

describe("<PostCard />", () => {
    const post: Post = {
        _id: "5f4c8f8f9f9f9f9f9f9f9f9",
        title: "Test title",
        content: "Test content",
        published: true,
        user: {
            _id: "5f4c8f8f9f9f9f9f9f9f9f4",
            username: "Satoshi",
            email: "test@test.net",
            blog: "Satoshi's Blog",
            subs: [],
            subscriptionPrice: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        premium: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(() => {
        render(
            <MemoryRouter>
                <PostCard post={post} />
            </MemoryRouter>
        );
    });

    test("renders post title", () => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
    });

    test("renders post author", () => {
        expect(screen.getByText(post.user.username)).toBeInTheDocument();
    });

    test("renders post createdAt formatted", () => {
        expect(
            screen.getByText(formatDateString(post.createdAt.toString()))
        ).toBeInTheDocument();
    });

    test("renders post author as a link", () => {
        expect(screen.getByText(post.user.username)).toHaveAttribute(
            "href",
            `/users/${post.user.username}/blog`
        );
    });

    test("renders 'Free' when post is not premium", () => {
        expect(screen.getByText("Free")).toBeInTheDocument();
    });
});
