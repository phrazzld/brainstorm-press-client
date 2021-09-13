import React from "react";
import { Header } from "./Header";
import { PostsList } from "./PostsList";

function App() {
    return (
        <div id="app-container" style={styles.appContainer}>
            <Header />
            <PostsList />
        </div>
    );
}

const styles = {
    appContainer: {
        width: "75%",
        marginLeft: "auto",
        marginRight: "auto"
    }
}

export default App;
