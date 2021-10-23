import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PostsList } from "../components/PostsList";
import { usePosts } from "../hooks/usePosts";
import { useStore } from "../store/zstore";
import { deleteRefreshToken } from "../utils/api";

export const Home = () => {
    const location = useLocation<{ logout: boolean }>();
    const { logout } = location.state || false;
    const setUser = useStore((state) => state.setUser);
    const setAccessToken = useStore((state) => state.setAccessToken);

    const [page, setPage] = useState<number>(1);
    const { posts, totalPages } = usePosts(page);

    const destroySession = async (): Promise<void> => {
        await deleteRefreshToken();
        setAccessToken("");
        setUser(null);
    };

    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ): void => {
        setPage(value);
    };

    useEffect(() => {
        if (logout) {
            destroySession();
        }
    }, [logout]);

    return (
        <>
            <PostsList posts={posts} />
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePaginationChange}
            />
        </>
    );
};
