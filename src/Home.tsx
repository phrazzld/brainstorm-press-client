import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PostsList } from "./PostsList";
import { useStore } from "./store/zstore";

export const Home = () => {
    const location = useLocation<{ logout: boolean }>();
    const { logout } = location.state || false;
    const setUser = useStore((state) => state.setUser);

    useEffect(() => {
        if (logout) {
            setUser(null);
        }
    }, [logout]);

    return <PostsList />;
};
