import React from "react";
import { useParams } from "react-router-dom";
import { PostsList } from "./PostsList";
import { useBlogPosts } from "./useBlogPosts";

type BlogParams = {
    userId: string;
};

export const Blog = () => {
    const { userId } = useParams<BlogParams>();
    const posts = useBlogPosts(userId);

    // TODO: Fetch user name and blog name, show in title
    return (
        <div id="blog-container">
            <PostsList posts={posts} />
        </div>
    );
};
