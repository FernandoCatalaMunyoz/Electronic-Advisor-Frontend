import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useEffect, useState } from "react";
import { CInput } from "../../common/CInput/Cinput";
import { CButton } from "../../common/CButton/CButton";
import { RegisterUser } from "../../services/apicalls";
import { validame } from "../../utils/functions";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  useEffect(() => {
    toast.dismiss();
    userError.firstNameError && toast.warn(userError.firstNameError);
    userError.lastNameError && toast.warn(userError.lastNameError);
    userError.countryError && toast.warn(userError.countryError);
    userError.emailError && toast.warn(userError.emailError);
    userError.passwordError && toast.warn(userError.passwordError);
  }, [userError]);
  const registerMe = async () => {
    try {
      for (let element in user) {
        if (user[element] === "") {
          throw new Error("Please, fill all the fields");
        }
      }
      const fetched = await RegisterUser(user);
      toast.success("User registered successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1750);
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

        <CButton
          className={"cButtonDesign"}
          title={"Register"}
          functionEmit={registerMe}
        />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </div>
    </>
  );
};
