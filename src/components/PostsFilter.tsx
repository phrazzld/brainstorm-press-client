import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import * as _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";

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

interface Props {
    onFreeChanged: (free: boolean) => void;
    onSearchChanged: (query: string) => void;
}

export const PostsFilter = (props: Props) => {
    const { onFreeChanged, onSearchChanged } = props;

    const [searchInputValue, setSearchInputValue] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const [free, setFree] = useState<boolean>(false);

    const throttledQuery = useCallback(_.throttle(setQuery, 500), []);

    const handleSearchChange = (e: any): void => {
        setSearchInputValue(e.target.value);
        throttledQuery(e.target.value);
    };

    const handleFreeChange = (e: any): void => {
        setFree((free: boolean) => !free);
    };

    useEffect(() => {
        onFreeChanged(free);
    }, [free, onFreeChanged]);

    useEffect(() => {
        onSearchChanged(query);
    }, [query, onSearchChanged]);

    return (
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon color="info" />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search..."
                    inputProps={{ "aria-label": "search" }}
                    value={searchInputValue}
                    onChange={handleSearchChange}
                />
            </Search>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={free}
                            onChange={handleFreeChange}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    }
                    label="Free"
                />
            </FormGroup>
        </Box>
    );
};
