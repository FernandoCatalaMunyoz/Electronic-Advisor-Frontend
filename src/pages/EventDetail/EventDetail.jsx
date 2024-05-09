import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/detailslice";
import "./EventDetail.css";

export const EventDetail = () => {
  const rdxDetail = useSelector(detailData);
  console.log(rdxDetail, "rdxDetail");
  return (
    <div className="eventDetailDesign">
      <div className="eventInfo">
        <div className="eventDetailTitle">Event Info</div>
        <div className="eventDetailContent">
          <div className="eventDetailName">
            Name : {rdxDetail?.detail?.name}
          </div>
          <div className="eventDetailClub">
            Club : {rdxDetail?.detail?.club.name}
          </div>
          <div className="eventDetailAddress">
            Address : {rdxDetail?.detail?.club.address}
          </div>
          <div className="eventDetailClubLink">
            Link : {rdxDetail?.detail?.club.link}
          </div>
          <div className="eventDetailDate">
            Date :
            {" " +
              rdxDetail?.detail?.day +
              "/" +
              rdxDetail?.detail?.month +
              "/" +
              rdxDetail?.detail?.year}
          </div>
        </div>
      </div>
      <div className="artistsInfo">
        <div className="artistTitle">Artists</div>
        <div className="eventDetailArtists">
          {rdxDetail?.detail?.artistEvents.map((artist) => (
            <li key={artist.id} className="eventDetailArtist">
              {artist.artist.name}
            </li>
          ))}
        </div>
      </div>

      {/* <div className="eventDetailImage">Event Image</div> */}
    </div>
  );
};
