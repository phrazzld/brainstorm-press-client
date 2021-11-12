import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import { useAccessToken } from "../hooks/useAccessToken";
import { useBlogPosts } from "../hooks/useBlogPosts";
import { usePublicUserInfo } from "../hooks/usePublicUserInfo";
import { useSubs } from "../hooks/useSubs";
import { useStore } from "../store/zstore";
import { Post, User } from "../utils/types";
import { Blog } from "./Blog";

jest.mock("../hooks/usePublicUserInfo");
jest.mock("../hooks/useAccessToken");
jest.mock("../hooks/useBlogPosts");
jest.mock("../store/zstore");
jest.mock("../hooks/useSubs");

describe("<Blog />", () => {
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
        usePublicUserInfo.mockReturnValue(user);
        useAccessToken.mockReturnValue("test");
        useBlogPosts.mockReturnValue({ posts: posts, totalPages: 1 });
        useStore.mockReturnValue({
            user: user,
        });
        useSubs.mockReturnValue([]);

        render(
            <MemoryRouter initialEntries={[`/users/TestUser/blog`]}>
                <Route path="/users/:username/blog">
                    <Blog />
                </Route>
            </MemoryRouter>
        );
    });

    it("should render user's blog name", () => {
        const blogName = screen.getByText(user.blog);
        expect(blogName).toBeInTheDocument();
    });

    it("should render user's posts", () => {
        posts.forEach((post) => {
            const postTitle = screen.getByText(post.title);
            expect(postTitle).toBeInTheDocument();
        });
    });
});
