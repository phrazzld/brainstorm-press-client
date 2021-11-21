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
    const setLnToken = useStore((state) => state.setLnToken);

    const [search, setSearch] = useState<string>("");
    const [free, setFree] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const { posts, totalPages } = usePosts(page, free, search);

    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ): void => {
        setPage(value);
    };

    useEffect(() => {
        const destroySession = async (): Promise<void> => {
            await deleteRefreshToken();
            setLnToken("");
            setAccessToken("");
            setUser(null);
        };

        if (logout) {
            destroySession();
        }
    }, [logout, setAccessToken, setLnToken, setUser]);

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
