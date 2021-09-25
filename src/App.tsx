import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthenticateUser } from "./AuthenticateUser";
import { CreateNewPostForm } from "./CreateNewPostForm";
import { Header } from "./Header";
import { Home } from "./Home";

function App() {
    return (
        <Router>
            <div id="app-container" style={styles.appContainer}>
                <Header />
                <Switch>
                    <Route path="/authenticate">
                        <AuthenticateUser authType="SIGNUP" />
                    </Route>
                    <Route path="/posts/new">
                        <CreateNewPostForm />
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
