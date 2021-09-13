import React from "react";

export type TPost = {
    id: number;
    title: string;
    author: string;
    body: string;
};

interface IProps {
    post: TPost;
}

export const Post = (props: IProps) => {
    const { post } = props;

    return (
        <div className="post" style={styles.postContainer}>
            <h3 className="post-title">{post.title}</h3>
            <h4 className="post-author">{post.author}</h4>
            <p className="post-body">{post.body}</p>
        </div>
    );
};

const styles = {
    postContainer: {
        border: "1px solid gray",
        borderRadius: 5,
        padding: 15,
        marginTop: 10,
        marginBottom: 10
    }
}
