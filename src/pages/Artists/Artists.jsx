import { useNavigate } from "react-router-dom";
import "./Artists.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect } from "react";

export const Artists = () => {
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  useEffect(() => {
    if (rdxUser?.credentials?.user?.roleName !== "super_admin") {
      navigate("/");
    }
  }, [rdxUser]);
  return <div>Artists</div>;
};
