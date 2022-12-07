import React, { useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal/Modal";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import Error from "../UI/Error/Error";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import styles from "./MyReq.module.css";
import { useHistory } from "react-router-dom";
const MyPost = (props) => {
  const [postData, setPostData] = useState();
  const authCtx = useContext(AuthContext);
  const id = authCtx.userId;
  const token = authCtx.token;
  const history = useHistory();
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_SERVER2}/myBooks`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );

        setPostData(data);
      } catch (err) {}
    };
    getProfileData();
  }, [sendRequest, authCtx.id, authCtx.token]);
  const clickHandler = (event) => {
    props.setShowPost();
    props.closeNotification();
    history.push(`/bookDetails/${event.target.value}`);
  };
  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      {postData && (
        <Modal onHideModal={props.setShowPost}>
          <div className={styles.container}>
            <h1>My Post</h1>
            <table>
              <tr>
                <th>Book Name</th>
                <th>View Details</th>
              </tr>
              {postData &&
                postData.map((item) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>
                        <button value={item.id} onClick={clickHandler}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyPost;
