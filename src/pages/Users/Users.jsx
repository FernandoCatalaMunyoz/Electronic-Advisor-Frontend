import { useNavigate } from "react-router-dom";
import "./Users.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { DeleteUser, GetUsers } from "../../services/apicalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [usersPage, setUsersPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(15);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const deleteUser = async (id) => {
    try {
      await DeleteUser(token, id);
      toast.success("User deleted successfully");
      setUsers([]);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="usersDesign">
      <div className="titleUsers">Users</div>
      <div className="titlesUser">
        <div className="titleName">Name</div>
        <div className="titleLastName">Last Name</div>
        <div className="titleCountry">Country</div>
        <div className="titleEmail">Email</div>
        <div className="titleDelete">Delete</div>
      </div>
      <div className="usersListDesign">
        {currentUsers.map((user) => (
          <div key={user.id} className="userDesign">
            <div className="userFirstName">{user.firstName}</div>
            <div className="userLastName">{user.lastName}</div>
            <div className="userCountry">{user.country}</div>
            <div className="userEmail">{user.email}</div>
            <div className="deleteUser" onClick={() => deleteUser(user.id)}>
              <img
                className="imgDeleteUser"
                src="../public/img/eliminar.png"
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </div>
  );
};
