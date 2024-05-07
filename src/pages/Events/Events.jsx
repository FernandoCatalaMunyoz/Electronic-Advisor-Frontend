import { useNavigate } from "react-router-dom";
import "./Events.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { CInput } from "../../common/CInput/Cinput";
import { CButton } from "../../common/CButton/CButton";
import { CreateEvent } from "../../services/apicalls";

export const Events = () => {
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  const [event, setEvent] = useState({
    name: "",
    month: "",
    day: "",
    year: "",
    club: "",
  });
  const [eventError, setEventError] = useState({
    nameError: "",
    monthError: "",
    dayError: "",
    yearError: "",
    clubError: "",
  });
  const inputHandler = (e) => {
    setEvent((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (rdxUser?.credentials?.user?.roleName !== "super_admin") {
      navigate("/");
    }
  }, [rdxUser]);

  const createEvent = async () => {
    try {
      const token = rdxUser.credentials.token;
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
  return (
    <div className="eventDesign">
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
          <div className="buttonCreateDiv">
            <CButton
              className={"cButtonDesign"}
              title={"Crear"}
              functionEmit={createEvent}
            />
          </div>
        </div>
      </div>
      <div className="listEventsDesign">List of Events</div>
    </div>
  );
};
