import "./Profile.css";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { GetProfile, UpdateProfile } from "../../services/apicalls";
import { CInput } from "../../common/CInput/Cinput";
import { CButton } from "../../common/CButton/CButton";
import { validame } from "../../utils/functions";

export const Profile = () => {
  const navigate = useNavigate();

  const rdxUser = useSelector(userData);

  const [tokenStorage, setTokenStorage] = useState(rdxUser?.credentials?.token);

  const [loadedData, setLoadedData] = useState(false);
  const [write, setWrite] = useState("disabled");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    firstNameError: "",
    lastNameError: "",
    countryError: "",
    emailError: "",
  });

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const inputHandler = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    if (!rdxUser?.credentials?.token) {
      navigate("/");
    }
  }, [rdxUser.credentials.token]);
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const fetchedData = await GetProfile(tokenStorage);

        setUser({
          firstName: fetchedData.data.firstName,
          lastName: fetchedData.data.lastName,
          country: fetchedData.data.country,
          email: fetchedData.data.email,
        });
        setLoadedData(true);
      } catch (error) {}
    };
    if (!loadedData) {
      getUserProfile();
    }
  }, [loadedData]);

  const editProfile = async () => {
    try {
      const userDataToupdate = await UpdateProfile(
        rdxUser?.credentials?.token,
        user
      );

      setUser(userDataToupdate);
      setLoadedData(false);
      setWrite("disabled");
      setUserError({
        firstNameError: "",
        lastNameError: "",
        countryError: "",
        emailError: "",
      });
    } catch (error) {
      return error;
    }
    setLoadedData(false);
  };

  return (
    <div className="profileDesign">
      {!loadedData ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Profile</h1>
          <div className="profileForm">
            <CInput
              type={"text"}
              name={"firstName"}
              value={user.firstName || ""}
              onChangeFunction={(e) => inputHandler(e)}
              onBlurFunction={(e) => checkError(e)}
              disabled={write}
            />
            <div className="error">{userError.firstNameError}</div>
            <CInput
              type={"text"}
              name={"lastName"}
              value={user.lastName || ""}
              onChangeFunction={(e) => inputHandler(e)}
              onBlurFunction={(e) => checkError(e)}
              disabled={write}
            />
            <div className="error">{userError.lastNameError}</div>
            <CInput
              type={"text"}
              name={"country"}
              value={user.country || ""}
              onChangeFunction={(e) => inputHandler(e)}
              onBlurFunction={(e) => checkError(e)}
              disabled={write}
            />
            <div className="error">{userError.countryError}</div>
            <CInput
              type={"text"}
              name={"email"}
              value={user.email || ""}
              onChangeFunction={(e) => inputHandler(e)}
              onBlurFunction={(e) => checkError(e)}
              disabled={write}
            />
            <div className="error">{userError.emailError}</div>
            <CButton
              className={
                write === "" ? "cButtonGreen cButtonDesign" : "cButtonDesign"
              }
              title={write === "" ? "Confirmar" : "Editar"}
              functionEmit={write === "" ? editProfile : () => setWrite("")}
            />
          </div>
        </div>
      )}
    </div>
  );
};
