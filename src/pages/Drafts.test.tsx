import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { useDrafts } from "../hooks/useDrafts";
import { Post, User } from "../utils/types";
import { Drafts } from "./Drafts";

jest.mock("../hooks/useDrafts");

describe("<Drafts />", () => {
    const user: User = {
        _id: "1",
        username: "test",
        email: "test@test.net",
        blog: "Testing Blog",
        subs: [],
        subscriptionPrice: 250,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const drafts: Array<Post> = [
        {
            _id: "1",
            title: "Hello",
            content: "World",
            published: false,
            premium: false,
            user: user,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            _id: "2",
            title: "Test Post",
            content: "Test content in here",
            published: false,
            premium: false,
            user: user,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    beforeEach(() => {
        useDrafts.mockReturnValue({ posts: drafts, totalPages: 1 });

        render(
            <MemoryRouter>
                <Drafts />
            </MemoryRouter>
        );
    });

    describe("presence", () => {
        describe("unauthenticated", () => {
            test.todo("should not render any drafts");

            test.todo("should prompt user to log in");
        });

        describe("unauthorized", () => {
            test.todo("should not render any drafts");

            test.todo("should show forbidden page");
        });

        describe("authenticated", () => {
            it("should render heading", () => {
                expect(screen.getByText(/drafts/i)).toBeInTheDocument();
            });

            test.todo("should render drafts");

            test.todo("should render pagination component");
        });
    });

    describe("behavior", () => {
        describe("unauthenticated", () => {
            test.todo("should redirect to log in when login button is clicked");
        });

        describe("authenticated", () => {
            test.todo("should redirect to post page when post card is clicked");

            test.todo(
                "should render next page of drafts when pagination next button is clicked"
            );
        });
    });
});
