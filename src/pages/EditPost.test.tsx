import { fireEvent, render, screen } from "@testing-library/react";
import { EditPost } from "./EditPost";
import { MemoryRouter, Route } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { useAccessToken } from "../hooks/useAccessToken";
import { Post, User } from "../utils/types";

jest.mock("../hooks/usePost");
jest.mock("../hooks/useAccessToken");

describe("<EditPost />", () => {
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

    // Create test post
    const post: Post = {
        _id: "1",
        title: "Test Post",
        content: "Test Content",
        published: true,
        premium: false,
        user: user,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(() => {
        useAccessToken.mockReturnValue("test");
        usePost.mockReturnValue(post);

        render(
            <MemoryRouter initialEntries={[`/posts/${post._id}/edit`]}>
                <Route path="/posts/:postId/edit">
                    <EditPost />
                </Route>
            </MemoryRouter>
        );
    });

    describe("presence", () => {
        describe("unauthenticated", () => {
            test.todo("should not render edit post form");

            test.todo("should prompt user to log in");
        });

        describe("unauthorized", () => {
            test.todo("should show forbidden page");
        });

        describe("authorized", () => {
            test.todo("should render edit post form");

            test.todo("should populate inputs with draft post data");
        });
    });

    describe("behavior", () => {
        describe("unauthenticated", () => {
            test.todo("should redirect to login when log in link is clicked");
        });

        describe("authenticated", () => {
            test.todo("should save draft when 'Save' button is clicked");

            test.todo(
                "should discard changes and redirect to the Drafts page when 'Cancel' is clicked"
            );
        });
    });
});
