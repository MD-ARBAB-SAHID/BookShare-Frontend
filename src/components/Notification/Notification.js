import styles from "./Notification.module.css";
import { GrClose } from "react-icons/gr";
import NotificationModal from "../UI/NotificationModal/NotificationModal";
import MyPost from "../Notification/MyPost";
import MyReq from "../Notification/MyReq";
import React, { useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal/Modal";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import Error from "../UI/Error/Error";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import ResultButton from "./ResultButton";
const Notification = (props) => {
  const [showPost, setShowPost] = useState();
  const [showReq, setShowReq] = useState();
  const { notificationData } = props;
  const [notificationDatas, setNotificationDatas] = useState(notificationData);
  // const [notificationData, setNotificationData] = useState();
  const authCtx = useContext(AuthContext);
  const id = authCtx.userId;
  const token = authCtx.token;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const showMyPost = () => {
    // props.onClose();
    setShowPost((prevState) => !prevState);
  };
  const showMyReq = () => {
    // props.onClose();
    setShowReq((prevState) => !prevState);
  };
  const closeNotificationHandler = () => {
    // props.onClose();
    props.setShowNotification("");
  };

  return (
    <>
      {/* {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )} */}
      {showPost && (
        <MyPost
          setShowPost={showMyPost}
          closeNotification={props.setShowNotification}
        />
      )}
      {showReq && <MyReq setShowReq={showMyReq} />}
      {notificationDatas && (
        <NotificationModal onHideModal={props.onClose}>
          <div className={styles.container}>
            <div className={styles.topBar}>
              <h1>Notifications</h1>
              <GrClose
                className={styles.icon}
                onClick={closeNotificationHandler}
              />
            </div>
            <div className={styles.banner}>
              {notificationDatas.map((item) => {
                return (
                  <div key={Math.random()} className={styles.section}>
                    {item.status === "PENDING" && (
                      <p>
                        <font>{item.sendersName}</font> requested for
                        <font> {item.bookName}</font>
                      </p>
                    )}
                    {item.status === "PENDING" && (
                      <div>
                        <ResultButton
                          id={item._id}
                          setNotificationDatas={setNotificationDatas}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className={styles.actions}>
              <button onClick={showMyReq}>My requests</button>
              <button onClick={showMyPost}>My Post</button>
            </div>
          </div>
        </NotificationModal>
      )}
      )
    </>
  );
};

export default Notification;
