import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "./store/zstore";

export const Header = () => {
    const jwt: string = useStore((state) => state.jwt);

    return (
        <div
            id="app-header"
            style={styles.headerContainer as React.CSSProperties}
        >
            <nav>
                <Link to="/">Brainstorm Press</Link>
                {!jwt && <Link to="/authenticate">Sign Up</Link>}
                {jwt && <p>Welcome!</p>}
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
