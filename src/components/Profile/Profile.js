import React, { useEffect, useContext, useState } from "react";
import Styles from "./Profile.module.css";
import { IoCalendarOutline } from "react-icons/io5";
import {
  AiOutlineMail,
  AiOutlineEdit,
  AiOutlineBranches,
} from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { IoSchoolOutline } from "react-icons/io5";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import Error from "../UI/Error/Error";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import { branchname } from "../../components/Dashboard/dummydata";
const getBranch = (value) => {
  const branchName = branchname.find((branch) => branch.value === value);
  return branchName.bname;
};

const Profile = () => {
  const [profileData, setProfileData] = useState();
  const authCtx = useContext(AuthContext);
  const id = authCtx.userId;
  const token = authCtx.token;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_SERVER1}/profile`,
          "GET",
          null,
          {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        );

        setProfileData(data);
      } catch (err) {}
    };
    getProfileData();
    // eslint-disable-next-line
  }, [sendRequest, authCtx.id, authCtx.token]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      {!isError && !isLoading && profileData && (
        <div className={Styles.card}>
          <div className={Styles.left}>
            <img
              src={`${process.env.REACT_APP_SERVER3}/${profileData.image}`}
              alt="Profile Pic"
            />
          </div>

          <div className={Styles.wrap}>
            <div className={Styles.right}>
              <div className={Styles.element}>
                <h3>Hello EveryBody , I am</h3>
                <h1>{profileData.name}</h1>
              </div>

              <div className={Styles.element}>
                <h5>
                  “I am passionate about my work. Because I love what I do, I
                  have a steady source of motivation that drives me to do my
                  best. In my last job, this passion led me to challenge myself
                  daily and learn new skills that helped me to do better work.”
                </h5>
              </div>
              <div className={Styles.element}>
                <AiOutlineMail className={Styles.icon} />
                <span>{profileData.email}</span>
              </div>
              <div className={Styles.element}>
                <AiOutlineBranches className={Styles.icon} />
                <span>{getBranch(profileData.branch)}</span>
              </div>
              <div className={Styles.element}>
                <IoSchoolOutline className={Styles.icon} />
                <span>{profileData.college}</span>
              </div>
              <div className={Styles.element}>
                <IoCallOutline className={Styles.icon} />
                <span>{profileData.contactNo}</span>
              </div>
              <div className={Styles.element}>
                <AiOutlineEdit className={Styles.icon} />
                <span className={Styles.lola}>
                  {`Semester: ${profileData.semester} `}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
