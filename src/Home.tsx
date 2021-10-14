import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { deleteRefreshToken } from "./api";
import { PostsList } from "./PostsList";
import { useStore } from "./store/zstore";
import { usePosts } from "./usePosts";

export const Home = () => {
    const location = useLocation<{ logout: boolean }>();
    const { logout } = location.state || false;
    const setUser = useStore((state) => state.setUser);
    const setAccessToken = useStore((state) => state.setAccessToken);
    const posts = usePosts();

    const destroySession = async (): Promise<void> => {
        await deleteRefreshToken();
        setAccessToken("");
        setUser(null);
    };

    useEffect(() => {
        if (logout) {
            destroySession();
        }
    }, [logout]);

    return <PostsList posts={posts} />;
};
