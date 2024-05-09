import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/detailslice";
import "./EventDetail.css";

export const EventDetail = () => {
  const rdxDetail = useSelector(detailData);
  console.log(rdxDetail, "rdxDetail");
  return (
    <div className="eventDetailDesign">
      <div className="eventDetailTitle">Evento</div>
      <div className="eventDetailContent">
        <div className="eventDetailName">{rdxDetail?.detail?.name}</div>
        <div className="eventDetailDate">Event Date</div>
        <div className="eventDetailClub">{rdxDetail?.detail?.club.name}</div>
        <div className="eventDetailAddress">
          {rdxDetail?.detail?.club.address}
        </div>
        <div className="eventDetailClubLink">
          {rdxDetail?.detail?.club.link}
        </div>
        <div className="eventDetailDate">
          {rdxDetail?.detail?.day +
            "/" +
            rdxDetail?.detail?.month +
            "/" +
            rdxDetail?.detail?.year}
        </div>
        <div className="eventDetailArtists">
          {rdxDetail?.detail?.artistEvents.map((artist) => (
            <div key={artist.id} className="eventDetailArtist">
              {artist.artist.name}
            </div>
          ))}
          }
        </div>
        {/* <div className="eventDetailImage">Event Image</div> */}
      </div>
    </div>
  );
};
