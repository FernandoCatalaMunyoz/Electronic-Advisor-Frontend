import { useNavigate } from "react-router-dom";
import "./User.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect } from "react";

export const Users = () => {
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  useEffect(() => {
    if (rdxUser?.credentials?.user?.roleName !== "super_admin") {
      navigate("/");
    }
  }, [rdxUser]);

  return <div>Users</div>;
};
