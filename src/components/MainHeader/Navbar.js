import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import AuthContext from "../../store/auth-context";
import { useContext, useState } from "react";
import { RiNotification3Fill } from "react-icons/ri";
import Notification from "../../components/Notification/Notification";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import Error from "../UI/Error/Error";
const Navbar = () => {
  const [resBar, setResBar] = useState();
  const [showNotification, setShowNotification] = useState(false);
  const authCtx = useContext(AuthContext);
  let userLoggedin = authCtx.isLoggedin;
  const userId = authCtx.userId;
  const token = authCtx.token;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const logoutHandler = () => {
    setResBar(false);
    authCtx.logout();
  };
  const location = useLocation();
  const clickHandler = () => {
    setResBar((prevState) => !prevState);
  };
  const clickHandlerClose = () => {
    setResBar(false);
  };
  let HomePageSmooth = false;
  if (location.pathname === "/") {
    HomePageSmooth = true;
  }
  const showNotificationHandler = async () => {
    setResBar(false);
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_SERVER2}/incomingRequest`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      setShowNotification(data);
    } catch (err) {}
  };

  return (
    <nav className={resBar ? styles.navClicked : ""}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      {showNotification && (
        <Notification
          // onClose={showNotificationHandler}
          notificationData={showNotification}
          setShowNotification={setShowNotification}
        />
      )}
      <NavLink className={styles.logo} to="/" exact onClick={clickHandlerClose}>
        BOOK<font>Share</font>
      </NavLink>
      <div className={styles.menuIcon} onClick={clickHandler}>
        <i className={resBar ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={resBar ? styles.menuList : styles.menuListClose}>
        <div className={styles.center}>
          {HomePageSmooth && (
            <li>
              <a href="#services" onClick={clickHandlerClose}>
                Services
              </a>
            </li>
          )}
          {HomePageSmooth && (
            <li>
              <a href="#about" onClick={clickHandlerClose}>
                About Us
              </a>
            </li>
          )}
          {!userLoggedin && (
            <li>
              <a href="#footer" onClick={clickHandlerClose}>
                Contact Us
              </a>
            </li>
          )}
          {1 && (
            <li>
              <a href="#footer" onClick={clickHandlerClose}>
                Sponsers
              </a>
            </li>
          )}

          {userLoggedin && (
            <li>
              <NavLink
                activeClassName={styles.active}
                to={`/dashboard/${userId}`}
                // to="/dashboard"
                exact
                onClick={clickHandlerClose}
              >
                Dashboard
              </NavLink>
            </li>
          )}
          {userLoggedin && (
            <li>
              <NavLink
                activeClassName={styles.active}
                to="/profile"
                exact
                onClick={clickHandlerClose}
              >
                Profile
              </NavLink>
            </li>
          )}
          {userLoggedin && (
            <li>
              <NavLink
                activeClassName={styles.active}
                to="/postBook"
                exact
                onClick={clickHandlerClose}
              >
                Post Book
              </NavLink>
            </li>
          )}
        </div>
        <div className={styles.left}>
          {userLoggedin && (
            <li>
              <RiNotification3Fill
                className={styles.icon}
                onClick={showNotificationHandler}
              />
            </li>
          )}
          {!userLoggedin && (
            <li>
              <NavLink
                activeClassName={styles.active}
                to="/login"
                exact
                onClick={clickHandlerClose}
              >
                Login
              </NavLink>
            </li>
          )}
          {userLoggedin && (
            <li>
              <NavLink to="/" onClick={logoutHandler} exact>
                Logout
              </NavLink>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};
export default Navbar;
