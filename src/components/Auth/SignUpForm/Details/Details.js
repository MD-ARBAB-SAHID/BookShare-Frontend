import { useState, useRef, useContext } from "react";
import classes from "./Details.module.css";
import LoadingSpinner from "../../../UI/Loading Spinner/LoadingSpinner";
import Error from "../../../UI/Error/Error";
import useHttp from "../../../../hooks/use-http";
import AuthContext from "../../../../store/auth-context";

import { AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import { IoSchoolOutline } from "react-icons/io5";
const branchname = [
  {
    value: "CSE",
    bname: "Computer Science and Engineering",
  },
  {
    value: "EE",
    bname: "Electrical Engineering",
  },
  {
    value: "ME",
    bname: "Mechanical Engineering",
  },
  {
    value: "CE",
    bname: "Civil Engineering",
  },
  {
    value: "TE",
    bname: "Textile Engineering",
  },
  {
    value: "IT",
    bname: "Information Technology",
  },
  {
    value: "BT",
    bname: "Biotechnology",
  },
  {
    value: "OTHERS",
    bname: "Other Brancg",
  },
];

const Details = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [profileImage, setprofileImage] = useState();
  const [imageURL, setImageUrl] = useState(
    "https://rpgplanner.com/wp-content/uploads/2020/06/no-photo-available.png"
  );
  const imageRef = useRef();
  const [nameError, setNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [collegeError, setCollegeError] = useState(null);
  const [branchError, setBranchError] = useState(null);

  const semeterArray = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const authCtx = useContext(AuthContext);
  const email = authCtx.email;
  const password = authCtx.password;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const imageChangeHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageUrl(fileReader.result);
        setprofileImage(event.target.files[0]);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
    if (nameError) {
      nameValidator();
    }
  };
  const phoneChangeHandler = (event) => {
    setPhone(event.target.value);
    if (phoneError) {
      phoneValidator();
    }
  };
  const collegeChangeHandler = (event) => {
    setCollege(event.target.value);
    if (collegeError) {
      collegeValidator();
    }
  };
  const branchChangeHandler = (event) => {
    setBranch(event.target.value);
    if (branchError) {
      branchValidator();
    }
  };
  const semesterChangeHandler = (event) => {
    setSemester(event.target.value);
  };

  // validators
  const nameValidator = () => {
    if (!name || name.trim().length === 0) {
      setNameError("Name can't be empty");
      return false;
    } else {
      setNameError(null);
      return true;
    }
  };
  const phoneValidator = () => {
    if (!phone || phone.trim().length !== 10) {
      setPhoneError("Contact number must be of 10 digits");
      return false;
    } else {
      setPhoneError(null);
      return true;
    }
  };
  const collegeValidator = () => {
    if (!college || college.trim().length === 0) {
      setCollegeError("College name can't be empty");
      return false;
    } else {
      setCollegeError(null);
      return true;
    }
  };
  const branchValidator = () => {
    if (!branch || branch.trim().length === 0) {
      setBranchError("Branch can't be empty");
      return false;
    } else {
      setBranchError(null);
      return true;
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (
      !nameValidator() ||
      !phoneValidator() ||
      !collegeValidator() ||
      !branchValidator()
    ) {
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("contactNo", phone);
    formData.append("college", college);
    formData.append("branch", branch);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", password);
    formData.append("semester", semester);
    formData.append("image", profileImage);

    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_SERVER1}/signup`,
        "POST",
        formData
      );
      authCtx.login(data.token, data.id);
      // history.push(`/dashboard/${data.id}`);
    } catch (error) {}
  };

  return (
    <form className={classes.signupForm} onSubmit={formSubmitHandler}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      <div className={classes.inputDiv}>
        <div className={classes.input}>
          <label htmlFor="name">
            <AiOutlineUser />
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameValidator}
            placeholder="Enter your name"
          />
        </div>
        <div className={classes.error}>{nameError ? nameError : ""}</div>
      </div>

      <div className={classes.inputDiv}>
        <div className={classes.input}>
          <label htmlFor="phone">
            <AiOutlinePhone />
          </label>
          <input
            id="phone"
            type="number"
            value={phone}
            onChange={phoneChangeHandler}
            onBlur={phoneValidator}
            placeholder="Enter contact number"
          />
        </div>
        <div className={classes.error}>{phoneError ? phoneError : ""}</div>
      </div>

      <div className={classes.inputDiv}>
        <div className={classes.input}>
          <label htmlFor="college">
            <IoSchoolOutline />
          </label>
          <input
            id="college"
            type="text"
            value={college}
            onChange={collegeChangeHandler}
            onBlur={collegeValidator}
            placeholder="Enter your college"
          />
        </div>
        <div className={classes.error}>{collegeError ? collegeError : ""}</div>
      </div>

      <div className={classes.inputDiv}>
        <div className={classes.input}>
          <select onChange={branchChangeHandler}>
            <option value="none" selected disabled hidden>
              Select Branch
            </option>
            {branchname.map((item) => {
              return (
                <option value={item.value} key={item.value}>
                  {item.bname}
                </option>
              );
            })}
          </select>
        </div>
        <div className={classes.error}>{branchError ? branchError : ""}</div>
      </div>

      <div className={classes.inputDiv}>
        <div className={classes.input}>
          <select onChange={semesterChangeHandler}>
            <option value="none" selected disabled hidden>
              Select semester
            </option>
            <option>{"1"}</option>
            <option>{"2"}</option>
            <option>{"3"}</option>
            <option>{"4"}</option>
            <option>{"5"}</option>
            <option>{"6"}</option>
            <option>{"7"}</option>
            <option>{"8"}</option>
          </select>
        </div>
      </div>
      <div className={classes.inputDiv}>
        <input
          type="file"
          id="image"
          ref={imageRef}
          style={{ display: "none" }}
          accept=".jpg,.png,.jpeg"
          onChange={imageChangeHandler}
        />
      </div>
      <div className={classes.preview}>
        <img src={imageURL} alt="Profile Pic" />
      </div>
      <div className={classes.btnSubmit}>
        <button
          className={classes.button}
          onClick={() => imageRef.current.click()}
          type="button"
        >
          Pick An Image
        </button>
      </div>
      <div className={classes.btnSubmit}>
        <button className={classes.button} type="submit">
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Details;
