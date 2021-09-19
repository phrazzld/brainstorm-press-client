import React, { useState } from "react";
import { CreateNewPostForm } from "./CreateNewPostForm";
import { Header } from "./Header";
import { PostsList } from "./PostsList";
import { ConnectToLndForm } from './ConnectToLndForm'

function App() {
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const [showConnectToLndForm, setShowConnectToLndForm] = useState<boolean>(false)

    return (
        <div id="app-container" style={styles.appContainer}>
            <Header onNewPostClick={() => setShowCreateForm(true)} onConnectToLndClick={() => setShowConnectToLndForm(true)} />
            {showCreateForm && <CreateNewPostForm />}
            {showConnectToLndForm && <ConnectToLndForm />}
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
