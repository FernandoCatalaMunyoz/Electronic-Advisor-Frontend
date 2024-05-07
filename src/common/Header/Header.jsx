import { userData, logout } from "../../app/slices/userSlice";
import { CLink } from "../CLink/CLink";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";

export const Header = () => {
  const rdxUser = useSelector(userData);
  const dispatch = useDispatch();

  return (
    <div className="header-design">
      <div className="title"></div>
      <div className="navigate">
        <CLink path={"/"} title={"HOME"} />
        {rdxUser?.credentials?.token ? (
          <div className="navigator-design">
            <CLink path="/profile" title="MI PERFIL" />
            {rdxUser.credentials.user.roleName === "super_admin" ? (
              <div className="superAdminNav">
                <CLink path={"/superAdmin/users"} title={"Users"} />
                <CLink path={"/superAdmin/artists"} title={"Artists"} />
                <CLink path={"/superAdmin/events"} title={"Events"} />
                <CLink path={"/superAdmin/clubs"} title={"Clubs"} />
              </div>
            ) : null}
            <div
              className="out-design"
              onClick={() => dispatch(logout({ credentials: "" }))}
            >
              <CLink path={"/"} title={"LOGOUT"} />
            </div>
          </div>
        ) : (
          <div className="navigator-design">
            <CLink path="/login" title="LOGIN" />
            <CLink path="/register" title="REGISTER" />
          </div>
        )}
      </div>
    </div>
  );
};
