import { useNavigate } from "react-router-dom";
import "./User.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { GetUsers } from "../../services/apicalls";

export const Users = () => {
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (rdxUser?.credentials?.user?.roleName !== "super_admin") {
      navigate("/");
    }
  }, [rdxUser]);
  useEffect(() => {
    if (users.length === 0) {
      const bringUsers = async () => {
        const fetchUsers = await GetUsers(rdxUser?.credentials?.token);
        console.log(fetchUsers.data, "fetchUsers");
        setUsers(fetchUsers.data);
      };
      bringUsers();
    }
  }, [users]);
  return (
    <div className="usersDesign">
      <div className="usersListDesign">Lista</div>
      <div className="createUserDesign">Crear</div>
    </div>
  );
};
