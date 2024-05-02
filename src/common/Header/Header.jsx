import "./Header.css";

import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userslice";

export const Header = () => {
  const rdxUser = useSelector(userData);
  console.log(rdxUser, "rdxUser");
  const dispatch = useDispatch();

  return <div className="header-design"></div>;
};
