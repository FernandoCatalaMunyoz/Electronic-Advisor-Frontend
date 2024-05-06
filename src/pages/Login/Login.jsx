import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login, userData } from "../../app/slices/userSlice";
import { LoginUser } from "../../services/apicalls";
import { decodeToken } from "react-jwt";
import { CInput } from "../../common/CInput/Cinput";
import { CButton } from "../../common/CButton/CButton";

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
    paswordError: "",
  });
  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginMe = async () => {
    try {
      const fetched = await LoginUser(user);
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
        }, 750);
      }
    } catch (error) {}
  };
  return (
    <div className="loginDesign">
      <div>INICIO DE SESIÓN</div>
      <CInput
        type={"email"}
        name={"email"}
        placeHolder={"Email"}
        value={user.email || ""}
        onChangeFunction={inputHandler}
      />
      <CInput
        type={"password"}
        name={"password"}
        placeHolder={"Contraseña"}
        value={user.password || ""}
        onChangeFunction={inputHandler}
      />
      <CButton
        className={"cButtonDesign"}
        functionEmit={() => loginMe()}
        title={"Login"}
      />
    </div>
  );
};
