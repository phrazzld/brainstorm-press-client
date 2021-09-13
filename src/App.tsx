import React, { useState } from "react";
import { CreateNewPostForm } from "./CreateNewPostForm";
import { Header } from "./Header";
import { PostsList } from "./PostsList";

function App() {
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

    return (
        <div id="app-container" style={styles.appContainer}>
            <Header onNewPostClick={() => setShowCreateForm(true)} />
            {showCreateForm && <CreateNewPostForm />}
            <PostsList />
        </div>
    );
}

const styles = {
    appContainer: {
        width: "75%",
        marginLeft: "auto",
        marginRight: "auto",
    },
};

export default App;
