import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Blog } from "./pages/Blog";
import { ConnectToLnForm } from "./pages/ConnectToLnForm";
import { CreateNewPostForm } from "./pages/CreateNewPostForm";
import { Drafts } from "./pages/Drafts";
import { EditPost } from "./pages/EditPost";
import { Faq } from "./pages/Faq";
import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";
import { Post } from "./pages/Post";
import { Profile } from "./pages/Profile";
import { ResetPassword } from "./pages/ResetPassword";
import { SendResetPasswordEmail } from "./pages/SendResetPasswordEmail";
import { Settings } from "./pages/Settings";
import { SignUp } from "./pages/SignUp";
import { Subs } from "./pages/Subs";

function App() {
  return (
    <Router>
      <Header />
      <div id="app-container" style={styles.appContainer}>
        <Switch>
          <Route path="/signup">
            <Helmet>
              <title>Sign Up - Brainstorm Press</title>
            </Helmet>
            <SignUp />
          </Route>
          <Route path="/login">
            <Helmet>
              <title>Log In - Brainstorm Press</title>
            </Helmet>
            <LogIn />
          </Route>
          <Route path="/faq">
            <Helmet>
              <title>FAQ - Brainstorm Press</title>
            </Helmet>
            <Faq />
          </Route>
          <Route path="/reset-password/:userId/:token">
            <Helmet>
              <title>Create a New Password - Brainstorm Press</title>
            </Helmet>
            <ResetPassword />
          </Route>
          <Route path="/reset-password">
            <Helmet>
              <title>Reset Your Password - Brainstorm Press</title>
            </Helmet>
            <SendResetPasswordEmail />
          </Route>
          <Route path="/connect-to-ln">
            <Helmet>
              <title>Connect To Lightning - Brainstorm Press</title>
            </Helmet>
            <ConnectToLnForm />
          </Route>
          <Route path="/profile">
            <Helmet>
              <title>Profile - Brainstorm Press</title>
            </Helmet>
            <Profile />
          </Route>
          <Route path="/settings">
            <Helmet>
              <title>Settings - Brainstorm Press</title>
            </Helmet>
            <Settings />
          </Route>
          <Route path="/subscriptions">
            <Helmet>
              <title>Subscriptions - Brainstorm Press</title>
            </Helmet>
            <Subs />
          </Route>
          <Route path="/posts/new">
            <Helmet>
              <title>New Post - Brainstorm Press</title>
            </Helmet>
            <CreateNewPostForm />
          </Route>
          <Route path="/drafts">
            <Helmet>
              <title>Drafts - Brainstorm Press</title>
            </Helmet>
            <Drafts />
          </Route>
          <Route path="/posts/:postId/edit">
            <Helmet>
              <title>Edit Post - Brainstorm Press</title>
            </Helmet>
            <EditPost />
          </Route>
          <Route path="/posts/:postId">
            <Post />
          </Route>
          <Route path="/users/:username/blog">
            <Blog />
          </Route>
          <Route path="/">
            <Helmet>
              <title>Home - Brainstorm Press</title>
            </Helmet>
            <Home />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

const styles = {
  appContainer: {
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "50px",
  },
};

export default App;
