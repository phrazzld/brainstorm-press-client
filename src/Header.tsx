import React from "react";

interface IProps {
    onNewPostClick: () => void;
}

export const Header = (props: IProps) => {
    const { onNewPostClick } = props;

    return (
        <div
            id="app-header"
            style={styles.headerContainer as React.CSSProperties}
        >
            <h1 id="app-title">Brainstorm Press</h1>
            <button style={styles.button} onClick={onNewPostClick}>
                New Post
            </button>
        </div>
    );
};

const styles = {
    headerContainer: {
        display: "flex",
        // Requires use with "as React.CSSProperties" because "row" is cast as a string
        // and cannot be coerced into the string literal matching FlexDirectionProperty
        // https://github.com/cssinjs/jss/issues/1344
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        marginRight: 10,
    },
};
