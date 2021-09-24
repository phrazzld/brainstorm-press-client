import React from "react";
import {Link} from 'react-router-dom';

export const Header = () => {
    return (
        <div
            id="app-header"
            style={styles.headerContainer as React.CSSProperties}
        >
            <nav>
                <Link to="/">Brainstorm Press</Link>
                <Link to="/signup">Sign Up</Link>
            </nav>
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
};
