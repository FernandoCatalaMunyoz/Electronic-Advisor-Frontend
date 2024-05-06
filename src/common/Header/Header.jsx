import { userData } from "../../app/slices/userSlice";
import { CLink } from "../CLink/CLink";
import "./Header.css";

import { useSelector, useDispatch } from "react-redux";

export const Header = () => {
  const rdxUser = useSelector(userData);
  console.log(rdxUser, "rdxUser");
  const dispatch = useDispatch();

  return (
    <div className="header-design">
      <div className="title"></div>
      <div className="navigate">
        <CLink path={"/"} title={"Home"} />
        {rdxUser?.credentials?.token ? (
          <div className="navigator-design">
            <CLink path="/profile" title="Profile" />
            {rdxUser.credentials.user.roleName === "super_admin" ? (
              <div>
                <CLink path={"/admin"} title={"Admin"} />
              </div>
            ) : null}
            <div
              className="out-design"
              onClick={() => dispatch(logout({ credentials: "" }))}
            >
              <CLink path={"/"} title={"Logout"} />
            </div>
          </div>
        ) : (
          <div className="navigator-design">
            <CLink path="/login" title="Login" />
            <CLink path="/register" title="Register" />
          </div>
        )}
      </div>
    </div>
  );
};
