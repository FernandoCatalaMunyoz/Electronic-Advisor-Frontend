import { useNavigate } from "react-router-dom";
import "./UserClubs.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { getClubs } from "../../services/artistApiCalls";

export const UserClubs = () => {
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    if (rdxUser?.credentials?.user?.roleName !== "super_admin") {
      navigate("/");
    }
  }, [rdxUser]);
  useEffect(() => {
    if (clubs.length === 0) {
      const bringClubs = async () => {
        const fetchClubs = await getClubs();
        const sortedClubs = fetchClubs.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setClubs(sortedClubs);
      };
      bringClubs();
    }
  });
  return (
    <div className="clubsDesign">
      <div className="clubsTitleDesign">CLUBS</div>
      <div className="clubsListDesign">
        {clubs.map((club) => (
          <div key={club.id} className="clubList">
            <div className="clubName">{club.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
