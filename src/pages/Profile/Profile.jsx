import "./Profile.css";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { GetProfile } from "../../services/apicalls";
import { CInput } from "../../common/CInput/Cinput";

export const Profile = () => {
  const navigate = useNavigate();

  const rdxUser = useSelector(userData);

  const [tokenStorage, setTokenStorage] = useState(rdxUser?.credentials?.token);
  console.log(rdxUser.credentials.token, "tokenStorage");
  const [loadedData, setLoadedData] = useState(false);
  const [write, setWrite] = useState("disabled");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    password: "",
  });

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
              value={user.firstName}
              onChange={(e) => inputHandler(e)}
              disabled={write}
            />
            <CInput
              type={"text"}
              name={"lastName"}
              value={user.lastName}
              onChange={(e) => inputHandler(e)}
              disabled={write}
            />
            <CInput
              type={"text"}
              name={"country"}
              value={user.country}
              onChange={(e) => inputHandler(e)}
              disabled={write}
            />
            <CInput
              type={"text"}
              name={"email"}
              value={user.email}
              onChange={(e) => inputHandler(e)}
              disabled={write}
            />
          </div>
        </div>
      )}
    </div>
  );
};
