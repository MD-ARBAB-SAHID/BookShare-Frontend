import { useState, useRef, useContext } from "react";
import classes from "./OTP.module.css";
import AuthContext from "../../../../store/auth-context";
import LoadingSpinner from "../../../UI/Loading Spinner/LoadingSpinner";
import Error from "../../../UI/Error/Error";
import useHttp from '../../../../hooks/use-http';
import { CgPassword } from "react-icons/cg";
const OTP = (props) => {
  const OTP = useRef();
  const [otpError, setOtpError] = useState(null);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const email = authCtx.email;

  // const email = localStorage.getItem("email");


  const otpValidator = () => {
    const otp = OTP.current.value;
    if (!otp || otp.trim().length === 0) {
      setOtpError("Enter OTP");
      return false;
    } else {
      setOtpError(null);
      return true;
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!otpValidator()) {
      return;
    }
    const otp = OTP.current.value;

    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_SERVER3}/api/verification/otp-verify`,
        "POST",
        JSON.stringify({ otp, email }),
        {
          "Content-Type": "application/json",
        }
      );
      props.showNextPage();
    } catch (error) {}
  };
  return (
    <form className={classes.container} onSubmit={formSubmitHandler}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      <div className={classes.inputDiv}>
        <div className={classes.input}>
          <label htmlFor="OTP">
            <CgPassword/>
          </label>
          <input
            id="OTP"
            type="text"
            onBlur={otpValidator}
            ref={OTP}
            placeholder="Enter OTP"
          />
        </div>
        <div className={classes.error}>{otpError ? otpError : ""}</div>
      </div>

      <div className={classes.btnSubmit}>
        <button className={classes.button}> Submit</button>
      </div>
    </form>
  );
};

export default OTP;
