import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import { CInput } from "../../common/CInput/Cinput";
import { CButton } from "../../common/CButton/CButton";
import { LoginUser, RegisterUser } from "../../services/apicalls";
import { validame } from "../../utils/functions";
import { decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { login } from "../../app/slices/userSlice";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "",
  });
  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
    firstNameError: "",
    lastNameError: "",
    countryError: "",
  });

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const registerMe = async () => {
    try {
      for (let element in user) {
        if (user[element] === "") {
          throw new Error("Please, fill all the fields");
        }
      }
      const fetched = await RegisterUser(user);

      setTimeout(() => {
        navigate("/login");
      }, 750);
    } catch (error) {}
  };

  return (
    <>
      <div className="registerDesign">
        <div className="titleRegisterDesign">Register</div>
        <CInput
          className={`inputDesign ${
            userError.nameError !== "" ? "inputDesignError" : ""
          }`}
          type={"text"}
          placeHolder={"FirstName"}
          name={"firstName"}
          value={user.firstName || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.nameError}</div>
        <CInput
          className={`inputDesign ${
            userError.lastNameError !== "" ? "inputDesignError" : ""
          }`}
          type={"text"}
          placeHolder={"LastName"}
          name={"lastName"}
          value={user.lastName || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.countryError}</div>
        <CInput
          className={`inputDesign ${
            userError.countryError !== "" ? "inputDesignError" : ""
          }`}
          type={"text"}
          placeHolder={"Country"}
          name={"country"}
          value={user.country || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.countryError}</div>
        <CInput
          className={`inputDesign ${
            userError.emailError !== "" ? "inputDesignError" : ""
          }`}
          type={"email"}
          placeHolder={"email"}
          name={"email"}
          value={user.email || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.emailError}</div>
        <CInput
          className={`inputDesign ${
            userError.passwordError !== "" ? "inputDesignError" : ""
          }`}
          type={"password"}
          placeHolder={"password"}
          name={"password"}
          value={user.password || ""}
          onChangeFunction={(e) => inputHandler(e)}
          onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{userError.passwordError}</div>
        <CButton
          className={"cButtonDesign"}
          title={"Register"}
          functionEmit={registerMe}
        />
      </div>
    </>
  );
};
