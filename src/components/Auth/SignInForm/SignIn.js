import { useState, useContext } from "react";
import classes from "./SignIn.module.css";
import AuthContext from "../../../store/auth-context";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../UI/Loading Spinner/LoadingSpinner";
import Error from "../../../components/UI/Error/Error";
import useHttp from "../../../hooks/use-http";
import { RiLockPasswordLine } from "react-icons/ri";
const Login = () => {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
    if (emailError) {
      emailValidator();
    }
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
    if (passwordError) {
      passwordValidator();
    }
  };

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const emailValidator = () => {
    if (!email || email.trim().length === 0) {
      setEmailError("Email can't be empty");
      return false;
    } else {
      setEmailError(null);
      return true;
    }
  };
  const passwordValidator = () => {
    if (!password || !password.trim().length === 0) {
      setPasswordError("Password can't be empty");
      return false;
    } else {
      setPasswordError(null);
      return true;
    }
  };

  // form submit
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!emailValidator() || !passwordValidator()) {
      return;
    }
    const logInData = {
      email,
      password,
    };

    try {

      const data = await sendRequest(
        `${process.env.REACT_APP_SERVER1}/login`,
        "POST",
        JSON.stringify(logInData),
        { "content-type": "application/json" }
      );
      authCtx.login(data.token, data.id);
      // history.push(`/dashboard/${data.id}`);

    } catch (error) {}
  };
  const showSignUpHandler = () => {
    history.push("/signup");
  };
  return (
    <div className={classes.container}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      <form className={classes.loginForm} onSubmit={formSubmitHandler}>
        <div className={classes.form}>
          <div className={classes.heading}>Sign in</div>
          <div className={classes.inputDiv}>
            <div className={classes.input}>
              <label htmlFor="email">
                <i className="far fa-user-circle"></i>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={emailChangeHandler}
                onBlur={emailValidator}
                placeholder="Enter your email"
              />
            </div>
            <div className={classes.error}>{emailError ? emailError : ""}</div>
          </div>

          <div className={classes.inputDiv}>
            <div className={classes.input}>
              <label htmlFor="password">
                <RiLockPasswordLine />
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={passwordChangeHandler}
                onBlur={passwordValidator}
                placeholder="Enter your password"
              />
            </div>
            <div className={classes.error}>
              {passwordError ? passwordError : ""}
            </div>
          </div>
          <div className={classes.btnSubmit}>
            <button className={classes.button} type="submit">
              Log in
            </button>
            <button
              className={classes.button}
              type="button"
              onClick={showSignUpHandler}
            >
              Sign Up for new account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
