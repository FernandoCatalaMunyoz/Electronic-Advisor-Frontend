import { useNavigate } from "react-router-dom";
import "./Events.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { CInput } from "../../common/CInput/Cinput";
import { CButton } from "../../common/CButton/CButton";
import {
  CreateEvent,
  DeleteEvent,
  GetEvents,
  UpdateEvent,
} from "../../services/apicalls";
import { EInput } from "../../common/EInput/EInput";

export const Events = () => {
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  const token = rdxUser?.credentials?.token;

  useEffect(() => {
    if (rdxUser?.credentials?.user?.roleName !== "super_admin") {
      navigate("/");
    }
  }, [rdxUser]);
  const [write, setWrite] = useState("disabled");
  const [loadedData, setLoadedData] = useState(false);
  const [event, setEvent] = useState({
    name: "",
    month: "",
    day: "",
    year: "",
    club: "",
  });
  const [editedEvent, setEditedEvent] = useState({
    name: "",
    month: "",
    day: "",
    year: "",
    club: "",
    id: "",
  });

  const [eventError, setEventError] = useState({
    nameError: "",
    monthError: "",
    dayError: "",
    yearError: "",
    clubError: "",
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (events.length === 0) {
      const bringEvents = async () => {
        const fetchEvents = await GetEvents();
        console.log(fetchEvents.data, "fetchEvents");
        setEvents(fetchEvents.data);
      };
      bringEvents();
    }
  }, [events]);

  const inputHandler = (e) => {
    setEvent((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createEvent = async () => {
    try {
      const token = rdxUser?.credentials?.token;
      // for (let element in event) {
      //   if (event[element] === "") {
      //     throw new Error("Please, fill all the fields");
      //   }
      // }
      const fetched = await CreateEvent(event, token);
      console.log(fetched, "fetched");

      setEvent([]);
    } catch (error) {}
  };
  const deleteEvent = async (id) => {
    try {
      await DeleteEvent(token, id);
      console.log(id, "id a borrar");
      setEvents([]);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const editEvent = async () => {
    try {
      for (let element in editedEvent) {
        if (event[element] === "") {
          throw new Error("Please, fill all the fields");
        }
      }
      const eventDataToUpdate = await UpdateEvent(
        rdxUser?.credentials?.token,
        eventId
      );
      setEvent(eventDataToUpdate);
      // setLoadedData(false);
      setWrite("disabled");
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="eventDesign">
      <div className="createEditDesign">
        <div className="createEventDesign">
          <div className="titleCreateDesign">Crear Evento</div>
          <div className="inputsCreateDesign">
            <CInput
              className={`inputDesign ${
                eventError.nameError !== "" ? "inputDesignError" : ""
              }`}
              placeHolder={"Nombre del Evento"}
              type={"text"}
              name={"name"}
              value={event.name || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <CInput
              className={`inputDesign ${
                eventError.nameError !== "" ? "inputDesignError" : ""
              }`}
              placeHolder={"Mes"}
              type={"text"}
              name={"month"}
              value={event.month || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <CInput
              className={`inputDesign ${
                eventError.nameError !== "" ? "inputDesignError" : ""
              }`}
              placeHolder={"Día"}
              type={"text"}
              name={"day"}
              value={event.day || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <CInput
              className={`inputDesign ${
                eventError.nameError !== "" ? "inputDesignError" : ""
              }`}
              placeHolder={"Año"}
              type={"text"}
              name={"year"}
              value={event.year || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <CInput
              className={`inputDesign ${
                eventError.nameError !== "" ? "inputDesignError" : ""
              }`}
              placeHolder={"Club ID"}
              type={"text"}
              name={"club"}
              value={event.club || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <div className="buttonCreate">
              <CButton
                className={"cButtonDesign"}
                title={"Crear"}
                functionEmit={createEvent}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="listEventsDesign">
        <div className="titleListEvents">List Events</div>
        <div className="listEvents">
          {events.map((event) => (
            <div key={event.id} className="eventListDesign">
              <div className="eventName">{event.name}</div>
              <div className="eventDate">{`${event.month}/${event.day}/${event.year}`}</div>
              <div className="eventClub">{event.club.name}</div>

              <div
                className="deleteEvent"
                onClick={() => deleteEvent(event.id)}
              >
                Borrar
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
