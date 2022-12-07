import { useState } from "react";
import Details from "./Details/Details";
import Email from "./Email/Email";
import OTP from "./OTPVerification/OTP";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const [showPage, setShowPage] = useState(() => {
    const array = [];
    array.push(true);
    array.push(false);
    array.push(false);
    return array;
  });
  const showFirstPage = () => {
    setShowPage((prevState) => {
      const array = [];
      array.push(true);
      array.push(false);
      array.push(false);
      return array;
    });
  };
  const showSecondPage = () => {
    setShowPage((prevState) => {
      const array = [];
      array.push(false);
      array.push(true);
      array.push(false);
      return array;
    });
  }
  const showThirdPage = ()  => {
    setShowPage((prevState) => {
      const array = [];
      array.push(false);
      array.push(false);
      array.push(true);
      return array;
    });
  }
  return (
    <div className={classes.container}>
      <div className={classes.loginForm}>
        <div className={classes.form}>
          <div className={classes.heading}>
            <div style={{backgroundColor : showPage[0] ? 'white' : ''}}>Email </div>
            <div style={{backgroundColor : showPage[1] ? 'white' : ''}}>OTP</div>
            <div style={{backgroundColor : showPage[2] ? 'white' : ''}}>Details</div>
          </div>
          { showPage[0] &&  <Email showNextPage={showSecondPage}/>}
          { showPage[1] && <OTP showNextPage={showThirdPage}/>}
          { showPage[2] && <Details />}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
