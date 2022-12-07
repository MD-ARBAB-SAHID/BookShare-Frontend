import React, { useContext } from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import AuthContext from "./store/auth-context";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import BookDetails from "./pages/BookDetails";
import Navbar from "./components/MainHeader/Navbar";
import Form from "./components/Form/Form";
import Footer from "./components/MainHeader/Footer";
import SignIn from "./components/Auth/SignInForm/SignIn";
import SignUp from "./components/Auth/SignUpForm/SignUp";
import "./App.css";

function App() {
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  let isLoggedIn = authCtx.isLoggedin;
  let hideFooter = false;
  if (location.pathname === "/") {
    hideFooter = true;
  }

  return (
    <div>
      <section />
      <header>
        <Navbar />
        {/* <Error/> */}
      </header>
      <main>
        <Switch>
          <Route path="/" exact>
            {!isLoggedIn && <Home />}
            {isLoggedIn && <Redirect to={`/dashboard/${authCtx.userId}`} />}
          </Route>
          <Route path="/login">
            {!isLoggedIn && <SignIn />}
            {isLoggedIn && <Redirect to={`/dashboard/${authCtx.userId}`} />}
          </Route>
          <Route path="/signup">
            {!isLoggedIn && <SignUp />}
            {isLoggedIn && <Redirect to={`/dashboard/${authCtx.userId}`} />}
          </Route>
          <Route path="/dashboard/:userId">
            {!isLoggedIn && <Redirect to="/login" />}
            {isLoggedIn && <Dashboard />}
          </Route>
          <Route path="/profile">
            {!isLoggedIn && <Redirect to="/login" />}
            {isLoggedIn && <ProfilePage />}
          </Route>
          <Route path="/postBook">
            {!isLoggedIn && <Redirect to="/login" />}
            {isLoggedIn && <Form />}
          </Route>
          <Route path="/bookDetails/:bookId">
            {!isLoggedIn && <Redirect to="/login" />}
            {isLoggedIn && <BookDetails />}
          </Route>
          <Route path="*">404 Page</Route>
        </Switch>
      </main>
      {!hideFooter && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
}

export default App;
