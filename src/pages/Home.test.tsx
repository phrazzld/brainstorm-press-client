import { render, screen } from "@testing-library/react";
import { useStore } from "../store/zstore";
import { Home } from "./Home";
import { usePosts } from "../hooks/usePosts";
import { MemoryRouter } from "react-router-dom";
import { Post, User } from "../utils/types";

jest.mock("../hooks/usePosts");
jest.mock("../store/zstore");

describe("<Home />", () => {
    // Create test user
    const user: User = {
        _id: "1",
        username: "TestUser",
        email: "test@test.net",
        blog: "Test Blog",
        subs: [],
        subscriptionPrice: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    // Create a few test posts
    const post1: Post = {
        _id: "1",
        title: "Test Post",
        content: "Test Content",
        published: true,
        premium: false,
        user: user,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const post2: Post = {
        _id: "2",
        title: "Test Post 2",
        content: "Test Content 2",
        published: true,
        premium: false,
        user: user,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const post3: Post = {
        _id: "3",
        title: "Test Post 3",
        content: "Test Content 3",
        published: true,
        premium: false,
        user: user,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const posts = [post1, post2, post3];

    beforeEach(() => {
        useStore.mockReturnValue({
            setUser: jest.fn(),
            setAccessToken: jest.fn(),
            setLnToken: jest.fn(),
        });
        usePosts.mockReturnValue(posts);

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
    });

    describe("presence", () => {
        test.todo("should render search bar");

        test.todo("should render premium post filter");

        test.todo("should render posts");

        test.todo("should render pagination controls");
    });

    describe("behavior", () => {
        test.todo("should log logged in user out logout state is passed");
    });
});
