import React from "react";
import { Link } from "react-router-dom";

export type TPost = {
    _id: number;
    title: string;
    content: string;
    price: number;
};

interface IProps {
    post: TPost;
}

export const PostCard = (props: IProps) => {
    const { post } = props;

    return (
        <div className="post" style={styles.postContainer}>
            <h3 className="post-title">
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
            </h3>
            <h4>Pay {post.price} sats to read</h4>
            <p className="post-body">{post.content}</p>
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
