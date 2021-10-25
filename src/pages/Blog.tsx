import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Pagination from "@mui/material/Pagination";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PostsList } from "../components/PostsList";
import { useBlogPosts } from "../hooks/useBlogPosts";

type BlogParams = {
    userId: string;
};

export const Blog = () => {
    const { userId } = useParams<BlogParams>();
    const [page, setPage] = useState<number>(1);

    const [free, setFree] = useState<boolean>(false);
    const { posts, totalPages } = useBlogPosts(userId, page, free);

    const handleFreeChange = (event: React.ChangeEvent<unknown>): void => {
        setFree((free: boolean) => !free);
    };

    const handlePaginationChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ): void => {
        setPage(value);
    };

    return (
        <div id="blog-container">
            <Typography variant="h1" component="div" gutterBottom>
                {posts[0]?.user.blog}
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
                {posts[0]?.user.username}
            </Typography>
            {posts[0]?.user.btcAddress && (
                <Typography
                    variant="subtitle1"
                    component="div"
                    style={{ display: "flex", alignItems: "center" }}
                    gutterBottom
                >
                    <FontAwesomeIcon
                        style={{
                            fontSize: 30,
                            marginRight: 10,
                            color: "#f2a900",
                        }}
                        icon={faBitcoin}
                    />
                    {posts[0]?.user.btcAddress}
                </Typography>
            )}
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
        </div>
    );
};
