import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthenticateUser } from "./AuthenticateUser";
import { ConnectToLndForm } from "./ConnectToLndForm";
import { CreateNewPostForm } from "./CreateNewPostForm";
import { Header } from "./Header";
import { Home } from "./Home";
import { Post } from "./Post";
import { Settings } from "./Settings";

function App() {
    return (
        <Router>
            <div id="app-container" style={styles.appContainer}>
                <Header />
                <Switch>
                    <Route path="/authenticate">
                        <AuthenticateUser authType="SIGNUP" />
                    </Route>
                    <Route path="/connect-to-lnd">
                        <ConnectToLndForm />
                    </Route>
                    <Route path="/settings">
                        <Settings />
                    </Route>
                    <Route path="/posts/new">
                        <CreateNewPostForm />
                    </Route>
                    <Route path="/posts/:postId">
                        <Post />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
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
