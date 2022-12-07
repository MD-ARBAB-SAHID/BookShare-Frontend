import BookCover from "../components/Profile/BookCover";
import { useParams } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import Searchresult from "../components/Dashboard/Searchresult";
import LoadingSpinner from "../components/UI/Loading Spinner/LoadingSpinner";
import Error from "../components/UI/Error/Error";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
const BookDetails = () => {
  const params = useParams();
  const bookId = params.bookId;

  const [bookData, setBookData] = useState();
  const authCtx = useContext(AuthContext);
  const id = authCtx.userId;
  const token = authCtx.token;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_SERVER2}/book-details/${bookId}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );

        setBookData(data);
      } catch (err) {}
    };
    getProfileData();
    // eslint-disable-next-line
  }, [sendRequest, authCtx.id, authCtx.token, bookId]);
  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      {bookData && <BookCover bookData={bookData} />}
    </div>
  );
};
export default BookDetails;
