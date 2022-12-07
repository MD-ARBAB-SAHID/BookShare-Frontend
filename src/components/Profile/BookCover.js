import React, { useContext } from "react";
import Styles from "./BookCover.module.css";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import Error from "../UI/Error/Error";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
const BookCover = (props) => {
  const { bookData } = props;

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const userId  = authCtx.userId;
  const history = useHistory();
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const clickHandler = async () => {
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_SERVER2}/addRequest`,
        "POST",
        JSON.stringify({ ownerId: bookData.owner, bookId: bookData.id }),
        {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      history.push("/dashboard/userId");

    } catch (error) {}
  };
  return (
    <div className={Styles.card}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      <div className={Styles.wrap}>
        <div className={Styles.left}>
          <div className={Styles.element}>
            <h1>{bookData.name}</h1>
            <h3>{bookData.author}</h3>
          </div>
          <div className={Styles.element}>
            <h5>{bookData.description}</h5>
          </div>
          <div className={Styles.element}>
            <h2>
              Subject : <span>{bookData.subject}</span>
            </h2>
            <h2>
              Branch : <span>{bookData.branch}</span>
            </h2>
            <h2>
              Semester : <span>{bookData.semester}</span>
            </h2>
          </div>
          <div className={Styles.element}>
            <h2>
              Owner : <span>{bookData.ownerName}</span>
            </h2>
          </div>
          <div className={Styles.actions}>
            {userId !== bookData.owner && <button onClick={clickHandler}>Request Book</button>}
          </div>
        </div>
      </div>

      <div className={Styles.right}>
        <img
          src={`${process.env.REACT_APP_SERVER3}/${bookData.image}`}
          alt="Profile Pic"
        />
      </div>
    </div>
  );
};

export default BookCover;
