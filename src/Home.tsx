import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PostsList } from "./PostsList";
import { useStore } from "./store/zstore";
import { usePosts } from "./usePosts";

export const Home = () => {
    const location = useLocation<{ logout: boolean }>();
    const { logout } = location.state || false;
    const setUser = useStore((state) => state.setUser);
    const setAccessToken = useStore((state) => state.setAccessToken);
    const posts = usePosts();

    useEffect(() => {
        if (logout) {
            setUser(null);
            setAccessToken("");
            // TODO: Hit logout endpoint to delete refresh token from DB
            // TODO: Delete refresh token cookie
        }
    }, [logout]);

    return <PostsList posts={posts} />;
};
