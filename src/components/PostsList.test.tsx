import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Post } from "../utils/types";
import { PostsList } from "./PostsList";

describe("<PostsList />", () => {
    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <PostsList posts={[]} />
            </MemoryRouter>
        );
    });

    it("renders a list of posts", () => {
        const posts: Array<Post> = [
            {
                _id: "43nthnh4nthu4hhtn3nhhut42",
                title: "Post 1",
                content: "Post 1 body",
                published: true,
                premium: false,
                user: {
                    _id: "1f4c8f8f9f9f939f9f9f9f4",
                    username: "Szabo",
                    email: "szabo@test.net",
                    blog: "Szabo's Blog",
                    subs: [],
                    subscriptionPrice: 10,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                _id: "4ntheht4nth34nth34nth2n",
                title: "Post 2",
                content: "Post 2 body",
                published: true,
                premium: true,
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
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        render(
            <MemoryRouter>
                <PostsList posts={posts} />
            </MemoryRouter>
        );

        expect(screen.getByText("Post 1")).toBeInTheDocument();
        expect(screen.getByText("Post 2")).toBeInTheDocument();
    });

    it("renders 'No posts found' when no posts are passed", () => {
        render(
            <MemoryRouter>
                <PostsList posts={[]} />
            </MemoryRouter>
        );

        expect(screen.getByText("No posts found")).toBeInTheDocument();
    });
});
