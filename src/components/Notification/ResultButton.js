import React, { useContext, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import Error from "../UI/Error/Error";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import styles from "./Notification.module.css";
import { FcCheckmark, FcCancel } from "react-icons/fc";
const ResultButton = (props) => {
  const authCtx = useContext(AuthContext);
  const id = authCtx.userId;
  const token = authCtx.token;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const finalHandler = async (event) => {

    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_SERVER2}/result`,
        "POST",
        JSON.stringify({ requestId: props.id, result: event.target.value }),
        {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      props.setNotificationDatas(data);
      // setNotificationData(data);
    } catch (err) {}
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      <div className={styles.controls}>
        <button
          onClick={finalHandler}
          value="ACCEPTED"
        >Accept</button>
        <button
          onClick={finalHandler}
          value="REJECTED"
        >Reject</button>
      </div>
    </>
  );
};

export default ResultButton;
