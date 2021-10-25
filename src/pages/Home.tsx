import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PostsFilter } from "../components/PostsFilter";
import { PostsList } from "../components/PostsList";
import { usePosts } from "../hooks/usePosts";
import { useStore } from "../store/zstore";
import { deleteRefreshToken } from "../utils/api";

export const Home = () => {
    const location = useLocation<{ logout: boolean }>();
    const { logout } = location.state || false;
    const setUser = useStore((state) => state.setUser);
    const setAccessToken = useStore((state) => state.setAccessToken);
    const setLndToken = useStore((state) => state.setLndToken);

    const [search, setSearch] = useState<string>("");
    const [free, setFree] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const { posts, totalPages } = usePosts(page, free, search);

    const destroySession = async (): Promise<void> => {
        await deleteRefreshToken();
        setLndToken("");
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
            <PostsFilter onFreeChanged={setFree} onSearchChanged={setSearch} />
            <PostsList posts={posts} />
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePaginationChange}
            />
        </>
    );
};
