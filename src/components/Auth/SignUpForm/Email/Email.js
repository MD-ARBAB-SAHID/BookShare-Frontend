import { useState, useContext } from "react";
import classes from "./Email.module.css";
import passwordValidator from "password-validator";
import AuthContext from "../../../../store/auth-context";
import useHttp from "../../../../hooks/use-http";
import LoadingSpinner from "../../../UI/Loading Spinner/LoadingSpinner";
import Error from "../../../UI/Error/Error";
import { RiLockPasswordLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
const Email = (props) => {
  const authCtx = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const schema = new passwordValidator();
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have at least 2 digits
    .has()
    .symbols()
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
    if (emailError) {
      emailValidatorHandler();
    }
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
    if (passwordError) {
      passwordValidatorHandler();
    }
  };
  const cPasswordChangeHandler = (event) => {
    if (!schema.validate(password)) {
      setCPasswordError("Please enter password first");
      return false;
    }
    setCPassword(event.target.value);
    if (cPasswordError) {
      cPasswordValidator();
    }
  };
  const history = useHistory();
  // validation
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [cPasswordError, setCPasswordError] = useState(null);

  const emailValidatorHandler = () => {
    if (!email || email.trim().length === 0) {
      setEmailError("Email can't be empty");
      return false;
    } else {
      setEmailError(null);
      return true;
    }
  };

  const passwordValidatorHandler = () => {

    if (schema.validate(password)) {
      setPasswordError(null);
      return true;
    } else {
      setPasswordError(
        "Password must be of 8 charcters and combination of numbers, special character, small & capital alphabets"
      );
      return false;
    }
  };

  const cPasswordValidator = () => {
    if (cPassword === password) {
      setCPasswordError(null);
      return true;
    } else {
      setCPasswordError("Password is not matching");
      return false;
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (
      !emailValidatorHandler() ||
      !passwordValidatorHandler() ||
      !cPasswordValidator
    ) {
      return;
    }

    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_SERVER3}/api/verification/sign-up`,
        "POST",
        JSON.stringify({ email, password, cPassword }),
        {
          "Content-Type": "application/json",
        }
      );
      authCtx.setData(email, password);

      localStorage.setItem("email", email);
      if (!isError) {
        props.showNextPage();
      }
    } catch (error) {}
  };
  const showSignUpHandler = () => {
    history.push("/login");
  };

  return (
    <form className={classes.container} onSubmit={formSubmitHandler}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
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
            onBlur={emailValidatorHandler}
            placeholder="Enter email"
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
            type="text"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordValidatorHandler}
            placeholder="Enter password"
          />
        </div>
        <div className={classes.error}>
          {passwordError ? passwordError : ""}
        </div>
      </div>

      <div className={classes.inputDiv}>
        <div className={classes.input}>
          <label htmlFor="cpassword">
            <RiLockPasswordLine />
          </label>
          <input
            id="cpassword"
            type="text"
            value={cPassword}
            onChange={cPasswordChangeHandler}
            onBlur={cPasswordValidator}
            placeholder="Confirm password"
          />
        </div>
        <div className={classes.error}>
          {cPasswordError ? cPasswordError : ""}
        </div>
      </div>

      <div className={classes.btnSubmit}>
        <button className={classes.button} type="submit">
          {" "}
          Send OTP
        </button>
        <button
          className={classes.button}
          type="button"
          onClick={showSignUpHandler}
        >
          Sign In with existing Account
        </button>
      </div>
    </form>
  );
};

export default Email;
