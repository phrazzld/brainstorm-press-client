import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PostsList } from "./PostsList";
import { useStore } from "./store/zstore";
import { usePosts } from "./usePosts";

export const Home = () => {
    const location = useLocation<{ logout: boolean }>();
    const { logout } = location.state || false;
    const setUser = useStore((state) => state.setUser);
    const setLndToken = useStore((state) => state.setLndToken);
    const posts = usePosts();

    useEffect(() => {
        if (logout) {
            setUser(null);
            setLndToken("");
        }
    }, [logout]);

    return <PostsList posts={posts} />;
};
