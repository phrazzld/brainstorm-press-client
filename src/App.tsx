import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { Blog } from "./pages/Blog";
import { ConnectToLndForm } from "./pages/ConnectToLndForm";
import { CreateNewPostForm } from "./pages/CreateNewPostForm";
import { Drafts } from "./pages/Drafts";
import { EditPost } from "./pages/EditPost";
import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";
import { Post } from "./pages/Post";
import { Settings } from "./pages/Settings";
import { SignUp } from "./pages/SignUp";

function App() {
    return (
        <Router>
            <Header />
            <div id="app-container" style={styles.appContainer}>
                <Switch>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/login">
                        <LogIn />
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
                    <Route path="/posts/drafts">
                        <Drafts />
                    </Route>
                    <Route path="/posts/:postId/edit">
                        <EditPost />
                    </Route>
                    <Route path="/posts/:postId">
                        <Post />
                    </Route>
                    <Route path="/users/:userId/blog">
                        <Blog />
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
