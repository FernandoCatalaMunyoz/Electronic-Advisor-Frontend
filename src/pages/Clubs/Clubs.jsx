import { useNavigate } from "react-router-dom";
import "./Clubs.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { getClubs } from "../../services/artistApiCalls";

export const Clubs = () => {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [clubsPerPage] = useState(10);
  const indexOfLastClub = currentPage * clubsPerPage;
  const indexOfFirstClub = indexOfLastClub - clubsPerPage;
  const currentClubs = clubs.slice(indexOfFirstClub, indexOfLastClub);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(clubs.length / clubsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="clubsDesignSa">
      <div className="clubsTitleDesignSa">CLUBS</div>
      <div className="clubsListDesignSa">
        {currentClubs.map((club) => (
          <div key={club.id} className="clubListSa">
            <div className="clubName">{club.name}</div>
          </div>
        ))}
      </div>
      <ul className="paginationSa">
        {pageNumbers.map((number) => (
          <li key={number} className="page-itemSa">
            <a
              onClick={() => paginate(number)}
              href="#"
              className="page-linkSa"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
