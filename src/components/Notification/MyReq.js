import React, { useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal/Modal";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import Error from "../UI/Error/Error";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import styles from "./MyReq.module.css";
import { useHistory } from "react-router-dom";
const MyReq = (props) => {
  const [reqData, setReqData] = useState();
  const [reqId, setReqId] = useState();
  const authCtx = useContext(AuthContext);
  const id = authCtx.userId;
  const token = authCtx.token;
  const history = useHistory();
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_SERVER2}/outgoingRequest`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );

        setReqData(data);
      } catch (err) {}
    };
    getProfileData();
    // eslint-disable-next-line
  }, [sendRequest, authCtx.id, authCtx.token]);
  const showDataHandler = (event) => {

    setReqId(event.target.value)

  };
  const closeDataHandler = () => {
    setReqId();
  };
  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      {reqData && (
        <Modal onHideModal={props.setShowReq}>
          <div className={styles.container}>
            <h1>My request</h1>
            <table>
              <tr>
                <th>Owner Name</th>
                <th>Book Name</th>
                <th>Status</th>
                <th>View Details</th>
              </tr>
              {reqData.map((item) => {
                return (
                  <>
                    <tr>
                      <td>{item.recieversName}</td>
                      <td>{item.bookName}</td>
                      <td>{item.status}</td>
                      <td>
                       {item.status==="ACCEPTED" && <button value={item._id} onClick={showDataHandler}>
                          View
                        </button>}
                      </td>
                    </tr>
                    {item.status === "ACCEPTED" && reqId && reqId === item._id && (
                      <tr>
                        <td>Address : {item.address}</td>
                        <td>Mobile : {item.contactNo}</td>
                        <td><button onClick={closeDataHandler}>Close</button></td>
                      </tr>
                    )}
                  </>
                );
              })}
            </table>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyReq;
