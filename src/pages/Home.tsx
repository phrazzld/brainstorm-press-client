import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Pagination from "@mui/material/Pagination";
import Switch from "@mui/material/Switch";
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
    const setLndToken = useStore((state) => state.setLndToken);

    const [free, setFree] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const { posts, totalPages } = usePosts(page, free);

    const handleFreeChange = (event: React.ChangeEvent<unknown>): void => {
        setFree((free: boolean) => !free);
    };

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
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={free}
                            onChange={handleFreeChange}
                            inputProps={{ "aria-label": "controlled" }}
                            defaultChecked
                        />
                    }
                    label="Only show free posts"
                />
            </FormGroup>
            <PostsList posts={posts} />
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePaginationChange}
            />
        </>
    );
};
