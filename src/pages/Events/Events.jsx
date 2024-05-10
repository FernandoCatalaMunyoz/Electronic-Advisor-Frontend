import { useNavigate } from "react-router-dom";
import "./Events.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { CInput } from "../../common/CInput/Cinput";
import { CButton } from "../../common/CButton/CButton";
import { validame } from "../../utils/functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CreateEvent,
  DeleteEvent,
  GetEvents,
  UpdateEvent,
} from "../../services/apicalls";

export const Events = () => {
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  const token = rdxUser?.credentials?.token;

  useEffect(() => {
    if (rdxUser?.credentials?.user?.roleName !== "super_admin") {
      navigate("/");
    }
  }, [rdxUser]);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [event, setEvent] = useState({
    name: "",
    month: "",
    day: "",
    year: "",
    clubId: "",
  });
  const [editedEvent, setEditedEvent] = useState({
    name: "",
    month: "",
    day: "",
    year: "",
    id: "",
  });

  const [eventError, setEventError] = useState({
    nameError: "",
    monthError: "",
    dayError: "",
    yearError: "",
    clubError: "",
  });
  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value);

    setEventError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };
  useEffect(() => {
    toast.dismiss();
    eventError.nameError && toast.warn(eventError.nameError);
    eventError.monthError && toast.warn(eventError.monthError);
    eventError.dayError && toast.warn(eventError.dayError);
    eventError.yearError && toast.warn(eventError.yearError);
    eventError.clubError && toast.warn(eventError.clubError);
  }, [eventError]);
  useEffect(() => {
    if (events.length === 0) {
      const bringEvents = async () => {
        const fetchEvents = await GetEvents();
        console.log(fetchEvents, "firstEvents");
        const sortedEvents = fetchEvents.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        console.log(fetchEvents.data, "fetchEvents.data");
        setEvents(fetchEvents.data);
      };
      bringEvents();
    }
  }, [events]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  const inputHandler = (e) => {
    setEvent((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const inputEditedHandler = (e) => {
    setEditedEvent((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const startEdit = (event) => {
    setEditedEvent({
      id: event.id,
      name: event.name,
      month: event.month,
      day: event.day,
      year: event.year,
    });
  };

  const createEvent = async () => {
    try {
      const token = rdxUser?.credentials?.token;
      console.log(event, "event");
      for (let element in event) {
        if (event[element] === "") {
          throw new Error("Please, fill all the fields");
        }
      }
      const fetched = await CreateEvent(event, token);
      console.log(fetched, "fetched");
      setEvent([]);
    } catch (error) {}
  };
  const deleteEvent = async (id) => {
    try {
      await DeleteEvent(token, id);
      toast.success("Event deleted successfully");
      setEvents([]);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const editEvent = async (id) => {
    try {
      for (let element in editedEvent) {
        if (element === "") {
          throw new Error("Please, fill all the fields");
        }
      }
      startEdit(editedEvent);
      await UpdateEvent(id, token, editedEvent);
      toast.success("Event updated successfully");
      startEdit("");
      setEvents([]);
    } catch (error) {
      return error;
    }
    editEvent();
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
              onBlurFunction={(e) => checkError(e)}
            />
            <CInput
              className={`inputDesign ${
                eventError.nameError !== "" ? "inputDesignError" : ""
              }`}
              placeHolder={"Month"}
              type={"text"}
              name={"month"}
              value={event.month || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <CInput
              className={`inputDesign ${
                eventError.nameError !== "" ? "inputDesignError" : ""
              }`}
              placeHolder={"Day"}
              type={"text"}
              name={"day"}
              value={event.day || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <CInput
              className={`inputDesign ${
                eventError.nameError !== "" ? "inputDesignError" : ""
              }`}
              placeHolder={"Year"}
              type={"text"}
              name={"year"}
              value={event.year || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <CInput
              className={`inputDesign ${
                eventError.nameError !== "" ? "inputDesignError" : ""
              }`}
              placeHolder={"ClubId"}
              type={"text"}
              name={"clubId"}
              value={event.clubId || ""}
              onChangeFunction={(e) => inputHandler(e)}
            />
            <div className="buttonCreate">
              <CButton
                className={"cButtonDesign"}
                title={"Crear"}
                functionEmit={() => createEvent()}
              />
            </div>
          </div>
        </div>
        <div className="editEventDesign">
          <div className="createEventDesign">
            <div className="titleCreateDesign">Editar Evento</div>
            <div className="inputsCreateDesign">
              <CInput
                className={`inputDesign ${
                  eventError.nameError !== "" ? "inputDesignError" : ""
                }`}
                placeHolder={"Nombre del Evento"}
                type={"text"}
                name={"name"}
                value={editedEvent.name || ""}
                onChangeFunction={(e) => inputEditedHandler(e)}
                onBlurFunction={(e) => checkError(e)}
              />
              <CInput
                className={`inputDesign ${
                  eventError.nameError !== "" ? "inputDesignError" : ""
                }`}
                placeHolder={"Mes"}
                type={"text"}
                name={"month"}
                value={editedEvent.month || ""}
                onChangeFunction={(e) => inputEditedHandler(e)}
              />
              <CInput
                className={`inputDesign ${
                  eventError.nameError !== "" ? "inputDesignError" : ""
                }`}
                placeHolder={"Día"}
                type={"text"}
                name={"day"}
                value={editedEvent.day || ""}
                onChangeFunction={(e) => inputEditedHandler(e)}
              />
              <CInput
                className={`inputDesign ${
                  eventError.nameError !== "" ? "inputDesignError" : ""
                }`}
                placeHolder={"Año"}
                type={"text"}
                name={"year"}
                value={editedEvent.year || ""}
                onChangeFunction={(e) => inputEditedHandler(e)}
              />
              <div className="buttonCreate">
                <CButton
                  className={"cButtonDesign"}
                  title={"Editar"}
                  functionEmit={() => editEvent(editedEvent.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="listEventsDesign">
        <div className="titleListEvents">List Events</div>
        <div className="listEvents">
          {currentEvents.map((event) => (
            <div key={event.id} className="eventListDesign">
              <div className="eventId">{event.id}</div>
              <div className="eventName">{event.name}</div>
              <div className="eventDate">{`${event.month}/${event.day}/${event.year}`}</div>
              {/* <div className="eventClub">{event.club}</div> */}
              <div className="editEvent" onClick={() => startEdit(event)}>
                Editar
              </div>
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
