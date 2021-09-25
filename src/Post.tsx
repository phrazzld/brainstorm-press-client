import React from "react";
import { useStore } from "./store/zstore";

export type TPost = {
    _id: number;
    title: string;
    content: string;
};

interface IProps {
    post: TPost;
}

export const Post = (props: IProps) => {
    const { post } = props;

    const jwt: string = useStore((state) => state.jwt);

    const deletePost = (): void => {
        const url: string = `/api/posts/${post._id}`;
        fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
    };

    return (
        <div className="post" style={styles.postContainer}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.content}</p>
            <div className="post-actions">
                <button className="delete-post" onClick={deletePost}>
                    Delete
                </button>
            </div>
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
