import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputBase from "@mui/material/InputBase";
import Pagination from "@mui/material/Pagination";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import * as _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PostsList } from "../components/PostsList";
import { usePosts } from "../hooks/usePosts";
import { useStore } from "../store/zstore";
import { deleteRefreshToken } from "../utils/api";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "80%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export const Home = () => {
    const location = useLocation<{ logout: boolean }>();
    const { logout } = location.state || false;
    const setUser = useStore((state) => state.setUser);
    const setAccessToken = useStore((state) => state.setAccessToken);
    const setLndToken = useStore((state) => state.setLndToken);

    const [searchInputValue, setSearchInputValue] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>(searchInputValue);
    const [free, setFree] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const { posts, totalPages } = usePosts(page, free, searchQuery);

    const throttledSearch = useCallback(_.throttle(setSearchQuery, 500), []);

    useEffect(() => {
        throttledSearch(searchInputValue);
    }, [searchInputValue]);

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

    const handleSearchKeyPress = (e: React.KeyboardEvent<any>): void => {
        if (e.key === "Enter") {
            console.log("Enter key pressed in search");
        }
    };

    useEffect(() => {
        if (logout) {
            destroySession();
        }
    }, [logout]);

    return (
        <>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon color="info" />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search..."
                        inputProps={{ "aria-label": "search" }}
                        value={searchInputValue}
                        onChange={(e) => setSearchInputValue(e.target.value)}
                        onKeyPress={handleSearchKeyPress}
                    />
                </Search>
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
                        label="Free"
                    />
                </FormGroup>
            </Box>
            <PostsList posts={posts} />
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePaginationChange}
            />
        </>
    );
};
