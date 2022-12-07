import React, { useState, useContext, useEffect } from "react";
import { posts } from "./dummydata";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@mui/material/Fab";
import { semester, branchname } from "./dummydata";
import "./Searchresult.css";
import { useHistory } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableFooter,
  useMediaQuery,
} from "@material-ui/core";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import Error from "../UI/Error/Error";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";

function MTable(props) {
  const booklist = props.bookList;
  const [bookList, setBookList] = useState();
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [semesterstate, setsemesterstate] = useState("ALL");
  const [branchstate, setbranchstate] = useState("CSE");

  const showBookDetailsHandler = (event) => {
    const bookId = event.target.value;
    history.replace(`/bookDetails/${bookId}`);
  };

  const submitHanlder = async (event) => {
    event.preventDefault();

    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_SERVER2}/filterBooks`,
        "POST",
        JSON.stringify({ semester: semesterstate, branch: branchstate }),
        {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      setBookList(data);
    } catch (err) {}
  };
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_SERVER2}/dashboard`,
          "GET",
          null,
          {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        );

        setBookList(data);
      } catch (err) {}
    };
    getProfileData();
    // eslint-disable-next-line
  }, [sendRequest, authCtx.id, authCtx.token]);
  if(isLoading){
    return <LoadingSpinner/>
  }

  return (
    <>
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      <div className="entirebody">
        <form className="selectsection" onSubmit={submitHanlder}>
          <div className="firstsec">
            <span className="title">Select Semseter</span>
            <div className="selectstyle">
              <select
                className="selecttag"
                value={semesterstate}
                onChange={(e) => {
                  setsemesterstate(e.target.value);
                }}
              >
                {semester.map((sem) => {
                  return <option value={sem.value}>{sem.sem}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="firstsec">
            <span className="title">Select Branch</span>
            <div className="selectstyle">
              <select
                className="selecttag"
                value={branchstate}
                onChange={(e) => {
                  setbranchstate(e.target.value);
                }}
              >
                {branchname.map((branch) => {
                  return <option value={branch.value}>{branch.bname}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="btnsec">
            <button className="filterbtn" type="submit">
              Filter
            </button>
          </div>
        </form>
        <div className="tableContainer">
          <table>
            <tr>
              <th>Book Name</th>
              <th>Subject</th>
              <th>View Details</th>
            </tr>
            {bookList &&
              bookList.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.subject}</td>
                    <td>
                      <button onClick={showBookDetailsHandler}value={item.id}>View Details</button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </>
  );
}

export default MTable;
