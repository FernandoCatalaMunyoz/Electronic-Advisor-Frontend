import "./EventCard.css";

export const EventCard = ({ title, month, day, year, clickDetail, club }) => {
  return (
    <div className="eventCardDesign" onClick={clickDetail}>
      <div className="eventCardTitle">{title}</div>
      <div className="eventCardClub">{club}</div>
      <div className="eventCardDate">
        {month}-{day}-{year}
      </div>
    </div>
  );
};
