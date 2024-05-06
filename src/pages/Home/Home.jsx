import "./Home.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { GetEvents } from "../../services/apicalls";
import { EventCard } from "../../common/EventCard/EventCard";

export const Home = () => {
  const rdxUser = useSelector(userData);
  const dispatch = useDispatch();
  const token = rdxUser?.credentials?.token;
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

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

  return (
    <>
      <div className="homeDesign">
        {events.length > 0 ? (
          <div className="eventCards">
            {events.map((event) => {
              return (
                <EventCard
                  key={event.id}
                  title={event.name}
                  month={event.month}
                  day={event.day}
                  year={event.year}
                  club={event.club.name}
                  clickDetail={() => {}}
                />
              );
            })}
          </div>
        ) : (
          <div>No hay eventos</div>
        )}
      </div>
    </>
  );
};
