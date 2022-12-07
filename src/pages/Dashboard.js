import React, { useState, useContext, useEffect } from "react";
import Searchresult from "../components/Dashboard/Searchresult";
import LoadingSpinner from "../components/UI/Loading Spinner/LoadingSpinner";
import Error from "../components/UI/Error/Error";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
const Dashboard = () => {
  const [bookData, setBookData] = useState();
  const authCtx = useContext(AuthContext);
  const id = authCtx.userId;
  const token = authCtx.token;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  // useEffect(() => {
  //   const getProfileData = async () => {
  //     try {
  //       const data = await sendRequest(
  //         // `${process.env.REACT_APP_SERVER}/users/profile`,
  //         "http://localhost:5000/api/books/dashboard",
  //         "GET",
  //         null,
  //         {
  //           "content-type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         }
  //       );

  //       setBookData(data);
  //     } catch (err) {}
  //   };
  //   getProfileData();
  //   // eslint-disable-next-line
  // }, [sendRequest, authCtx.id, authCtx.token]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      {!isLoading && !isError&&<Searchresult bookList={bookData} />}
    </>
  );
};

export default Dashboard;
