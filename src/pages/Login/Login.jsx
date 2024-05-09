import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login, userData } from "../../app/slices/userSlice";
import { LoginUser } from "../../services/apicalls";
import { decodeToken } from "react-jwt";
import { CInput } from "../../common/CInput/Cinput";
import { validame } from "../../utils/functions";
import { CButton } from "../../common/CButton/CButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const rdxUser = useSelector(userData);
  const token = rdxUser?.credentials?.token;
  if (token) {
    setTimeout(() => {
      navigate("/");
    }, 750);
  }
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
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
    userError.emailError && toast.warn(userError.emailError);
    userError.passwordError && toast.warn(userError.passwordError);
  }, [userError]);
  const loginMe = async () => {
    try {
      const fetched = await LoginUser(user);
      toast.success("User logged in successfully");
      console.log(fetched, "fetched");
      if (fetched.token) {
        const decoded = decodeToken(fetched.token);
        console.log(decoded, "decoded");
        const passport = {
          token: fetched.token,
          user: decoded,
        };
        dispatch(login({ credentials: passport }));
        setTimeout(() => {
          navigate("/");
        }, 1750);
      }
    } catch (error) {}
  };
  return (
    <div className="loginDesign">
      <div className="titleLoginDesign">Login</div>
      <CInput
        className={"cInputDesign"}
        type={"email"}
        name={"email"}
        placeHolder={"Email"}
        value={user.email || ""}
        onChangeFunction={inputHandler}
        onBlurFunction={checkError}
      />
      <CInput
        className={"cInputDesign"}
        type={"password"}
        name={"password"}
        placeHolder={"Contraseña"}
        value={user.password || ""}
        onChangeFunction={inputHandler}
        onBlurFunction={checkError}
      />
      <CButton
        className={"cButtonDesign"}
        functionEmit={() => loginMe()}
        title={"Login"}
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
        theme="dark"
        transition:Bounce
      />
    </div>
  );
};
