import { useNavigate } from "react-router-dom";
import "./User.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { DeleteEvent, DeleteUser, GetUsers } from "../../services/apicalls";

export const Users = () => {
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  const [users, setUsers] = useState([]);
  const token = rdxUser?.credentials?.token;
  useEffect(() => {
    if (rdxUser?.credentials?.user?.roleName !== "super_admin") {
      navigate("/");
    }
  }, [rdxUser]);
  useEffect(() => {
    if (users.length === 0) {
      const bringUsers = async () => {
        const fetchUsers = await GetUsers(rdxUser?.credentials?.token);
        setUsers(fetchUsers.data);
      };
      bringUsers();
    }
  }, [users]);

  const deleteUser = async (id) => {
    try {
      await DeleteEvent(token, id);
      console.log(id, "id a borrar");
      setUsers([]);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="usersDesign">
      <div className="usersListDesign">
        {users.map((user) => (
          <div key={user.id} className="userDesign">
            <div className="userFirstName">{user.firstName}</div>
            <div className="userLastName">{user.lastName}</div>
            <div className="userCountry">{user.country}</div>
            <div className="userEmail">{user.email}</div>
            <div className="deleteUser" onClick={() => deleteUser(user.id)}>
              Borrar
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
