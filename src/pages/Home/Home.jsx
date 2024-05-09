import "./Home.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { GetEvents } from "../../services/apicalls";

import { toDetail } from "../../app/slices/detailslice";

export const Home = () => {
  const rdxUser = useSelector(userData);
  const dispatch = useDispatch();
  const token = rdxUser?.credentials?.token;
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const bringEvents = async () => {
      try {
        const fetched = await GetEvents();
        console.log(fetched.data, "fetched events");
        setEvents(fetched.data);
      } catch (error) {}
    };
    if (!events.length) {
      bringEvents();
    }
  }, [events]);

  const toDetailEvent = (event) => {
    dispatch(toDetail({ detail: event }));
    navigate("/event-detail");
  };

  return (
    <>
      <div className="homeDesign">
        {events.length > 0 ? (
          <div className="eventCards">
            {currentEvents.map((event, index) => (
              <div
                key={event.id}
                className="eventListDesign"
                onClick={() => toDetailEvent(event)}
              >
                <div className="eventId">{index + 1}</div>
                <div className="eventName">{event.name}</div>
                <div className="eventDate">{`${event.month}/${event.day}/${event.year}`}</div>
                <div className="eventClub">{event.club.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>No hay eventos</div>
        )}
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                href="#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
