import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";

export const Home = () => {
  const rdxUser = useSelector(userData);
  const dispatch = useDispatch();
  const token = rdxUser?.credentials?.token;
  const navigate = useNavigate();

  return <div>Soy la vista Home</div>;
};
