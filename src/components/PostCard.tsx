import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Post } from "../utils/types";

interface Props {
    post: Post;
}

export const PostCard = (props: Props) => {
    const { post } = props;

    const [redirect, setRedirect] = useState<string>("");

    const goToPost = (): void => {
        setRedirect(`/posts/${post._id}`);
    };

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return (
        <Card style={styles.card}>
            <CardActionArea onClick={goToPost}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom>
                        Written by:{" "}
                        <Link to={`/users/${post.user?._id}/blog`}>
                            {post.user.username}
                        </Link>
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Pay {post.price} sats to read
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

const styles = {
    card: {
        marginTop: 20,
        marginBottom: 20,
    },
};
