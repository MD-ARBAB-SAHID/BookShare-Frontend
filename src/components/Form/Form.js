import { useState, useRef, useContext } from "react";
import classes from "./Form.module.css";
import deafultImage from "../../assets/default.jpg";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import Error from "..//UI/Error/Error";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import { semester, branchname } from "../Dashboard/dummydata";
import { AiOutlinePhone } from "react-icons/ai";
const Form = (props) => {
  const branchArray = [];
  for (let index = 1; index <= 10; index++) {
    branchArray.push(index);
  }

  // input
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [bookProfileImage, setBookProfileImage] = useState(null);
  const [imageURL, setImageUrl] = useState("");
  const imageRef = useRef();
  // checking error variables declaration
  const [branchError, setBranchError] = useState(null);
  const [semesterError, setSemesterError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [addressError, setAddressError] = useState(null);

  const [bookNameError, setBookNameError] = useState(null);
  const [authorError, setAuthorError] = useState(null);
  const [subjetError, setSubjectError] = useState(null);
  const [imageError, setImageError] = useState(null);
  // input change
  const branchChangeHandler = (event) => {
    setBranch(event.target.value);
  };
  const semesterChangeHandler = (event) => {
    setSemester(event.target.value);
  };
  const phoneChangeHandler = (event) => {
    setPhone(event.target.value);
  };
  const addressChangeHandler = (event) => {
    setAddress(event.target.value);
  };

  const bookNameChangeHandler = (event) => {
    setBookName(event.target.value);
  };

  const authorChangeHandler = (event) => {
    setAuthor(event.target.value);
  };

  const subjectChangeHandler = (event) => {
    setSubject(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  // validation
  const branchValidationHandler = () => {
    if (!branch || branch.trim().length === 0) {
      setBranchError("Branch can't be empty");
      return false;
    } else {
      setBranchError(null);
      return true;
    }
  };

  const semesterValidationHandler = () => {
    if (!semester || semester.trim().length === 0) {
      setSemesterError("Semester can't be empty");
      return false;
    } else {
      setSemesterError(null);
      return true;
    }
  };

  const phoneValidationHandler = () => {
    if (!phone || phone.trim().length !== 10) {
      setPhoneError("Contact number must be of 10 digits");
      return false;
    } else {
      setPhoneError(null);
      return true;
    }
  };

  const addressValidationHandler = () => {
    if (!address || address.trim().length === 0) {
      setAddressError("Address can't be empty");
      return false;
    } else {
      setAddressError(null);
      return true;
    }
  };

  const bookNameValidationHandler = () => {
    if (!bookName || bookName.trim().length === 0) {
      setBookNameError("Book name can't be empty");
      return false;
    } else {
      setBookNameError(null);
      return true;
    }
  };

  const authorValidationHandler = () => {
    if (!author || author.trim().length === 0) {
      setAuthorError("Author name can't be empty");
      return false;
    } else {
      setAuthorError(null);
      return true;
    }
  };

  const subjecthValidationHandler = () => {
    if (!subject || subject.trim().length === 0) {
      setSubjectError("Subject can't be empty");
      return false;
    } else {
      setSubjectError(null);
      return true;
    }
  };

  const imageChangeHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageUrl(fileReader.result);
        setBookProfileImage(event.target.files[0]);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const history = useHistory();
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (
      !phoneValidationHandler() ||
      !addressValidationHandler() ||
      !bookNameValidationHandler() ||
      !authorValidationHandler() ||
      !semesterValidationHandler() ||
      !subjecthValidationHandler() ||
      !branchValidationHandler ||
      !bookProfileImage
    ) {
      return;
    }
    const formData = new FormData();
    formData.append("name", bookName);
    formData.append("address", address);
    formData.append("contactNo", phone);
    formData.append("author", author);
    formData.append("semester", semester);
    formData.append("subject", subject);
    formData.append("branch", branch);
    formData.append("description", description);
    formData.append("bookImage", bookProfileImage);
    const data = {
      phone,
      address,
      bookName,
      author,
      semester,
      subject,
      branch,
      description,
    };
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_SERVER2}/addBook`,
        "POST",
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      history.push(`/dashboard/${authCtx.userId}`);
    } catch (error) {}

    // store data
  };

  return (
    <div className={classes.Form}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      <form className={classes.container} onSubmit={formSubmitHandler}>
        <div className={classes.formHeader}>
          <p>Drop your book</p>
        </div>
        <div className={classes.contactDetails}>
          <div className={classes.heading}>Contact details</div>
          <div className={classes.inputContainer}>
            <div className={classes.inputDiv}>
              <input
                type="number"
                value={phone}
                onChange={phoneChangeHandler}
                onBlur={phoneValidationHandler}
                placeholder=" Contact number"
              />
              <div className={classes.error}>
                {phoneError ? phoneError : ""}
              </div>
            </div>
            <div className={classes.inputDiv}>
              <input
                type="text"
                value={address}
                onChange={addressChangeHandler}
                onBlur={addressValidationHandler}
                placeholder=" Address"
              />
              <div className={classes.error}>
                {addressError ? addressError : ""}
              </div>
            </div>
          </div>
        </div>

        <div className={classes.bookDetails}>
          <div className={classes.heading}>Book details</div>
          <div className={classes.inputContainer}>
            <div className={classes.inputDiv}>
              <input
                type="text"
                value={bookName}
                onChange={bookNameChangeHandler}
                onBlur={bookNameValidationHandler}
                placeholder=" Book name"
              />
              <div className={classes.error}>
                {bookNameError ? bookNameError : ""}
              </div>
            </div>
            <div className={classes.inputDiv}>
              <input
                type="text"
                value={author}
                onChange={authorChangeHandler}
                onBlur={authorValidationHandler}
                placeholder=" Author"
              />
              <div className={classes.error}>
                {authorError ? authorError : ""}
              </div>
            </div>
          </div>

          <div className={classes.inputContainer}>
            <div className={classes.inputDiv}>
              <select
                onChange={semesterChangeHandler}
                onBlur={semesterValidationHandler}
                value={semester}
              >
                <option value="none" selected hidden>
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
              <div className={classes.error}>
                {semesterError ? semesterError : ""}
              </div>
            </div>

            <div className={classes.inputDiv}>
              <input
                type="text"
                value={subject}
                onChange={subjectChangeHandler}
                onBlur={subjecthValidationHandler}
                placeholder="Subject"
              />
              <div className={classes.error}>
                {subjetError ? subjetError : ""}
              </div>
            </div>
          </div>

          <div className={classes.inputContainer}>
            <div className={classes.inputDiv}>
              <select
                onChange={branchChangeHandler}
                onBlur={branchValidationHandler}
                value={branch}
              >
                <option value="value" selected hidden>
                  Select branch
                </option>
                {branchname.map((branch) => (
                  <option key={Math.random()} value={branch.value}>
                    {branch.bname}
                  </option>
                ))}
              </select>
              <div className={classes.error}>
                {branchError ? branchError : ""}
              </div>
            </div>
          </div>

          {/* add image picker here or below */}
          <div className={classes.inputContainer}>
            <div className={classes.textareaDiv}>
              <textarea
                placeholder="Description"
                value={description}
                onChange={descriptionChangeHandler}
                rows="3"
                cols="50"
              ></textarea>
            </div>
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
          <img src={imageURL || deafultImage} alt="Profile Pic" />
        </div>
        <div className={classes.btnSubmit}>
          <button
            className={classes.button}
            onClick={() => {
              imageRef.current.click();
              setImageError(true);
            }}
            type="button"
          >
            Pick An Image
          </button>
        </div>
        <div className={classes.error}>
          {!bookProfileImage && imageError ? "Please select Image" : ""}
        </div>
        <div className={classes.btnSubmit}>
          <button className={classes.button} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
