import React from "react";

export type TPost = {
    ID: number;
    title: string;
    author: string;
    body: string;
};

interface IProps {
    post: TPost;
}

export const Post = (props: IProps) => {
    const { post } = props;

    const deletePost = (): void => {
        const url: string = `/posts/${post.ID}`;
        fetch(url, {
            method: "DELETE",
        });
    };

    return (
        <div className="post" style={styles.postContainer}>
            <h3 className="post-title">{post.title}</h3>
            <h4 className="post-author">{post.author}</h4>
            <p className="post-body">{post.body}</p>
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
