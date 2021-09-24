import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Header} from "./Header";
import {Home} from "./Home";
import {SignUp} from './SignUp';

function App() {
    return (
        <Router>
            <div id="app-container" style={styles.appContainer}>
                <Header />
                <Switch>
                    <Route path="/signup">
                        <SignUp />
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
