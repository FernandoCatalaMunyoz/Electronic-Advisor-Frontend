import "./EventCard.css";

export const EventCard = ({ title, month, day, year, clickDetail }) => {
  return (
    <div className="eventCardDesign" onClick={clickDetail}>
      <div className="eventCardTitle">{title}</div>
      <div className="eventCardDate">
        {month}, {day}, {year}
      </div>
    </div>
  );
};
