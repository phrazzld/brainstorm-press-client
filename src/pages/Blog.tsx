import React from "react";
import { useParams } from "react-router-dom";
import { PostsList } from "../components/PostsList";
import { useBlogPosts } from "../hooks/useBlogPosts";

type BlogParams = {
    userId: string;
};

export const Blog = () => {
    const { userId } = useParams<BlogParams>();
    const posts = useBlogPosts(userId);

    return (
        <div id="blog-container">
            <h1>{posts[0]?.user.blog}</h1>
            <PostsList posts={posts} />
        </div>
    );
};
