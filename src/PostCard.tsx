import React from "react";
import { Link } from "react-router-dom";

type User = {
    _id: string;
    name: string;
    blog: string;
};

export type Post = {
    _id: string;
    title: string;
    content: string;
    price: number;
    user: User;
};

interface IProps {
    post: Post;
}

export const PostCard = (props: IProps) => {
    const { post } = props;

    return (
        <div className="post" style={styles.postContainer}>
            <h3 className="post-title">
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
            </h3>
            {post.user?.name && (
                <h4 className="post-author">Written by: {post.user?.name}</h4>
            )}
            <h4>Pay {post.price} sats to read</h4>
        </div>
    );
};

const styles = {
    postContainer: {
        border: "1px solid gray",
        borderRadius: 5,
        padding: 15,
        marginTop: 10,
        marginBottom: 10,
    },
};
