import { useNavigate } from "react-router-dom";
import "./Artists.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { GetArtists } from "../../services/artistApiCalls";

export const Artists = () => {
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    if (rdxUser?.credentials?.user?.roleName !== "super_admin") {
      navigate("/");
    }
  }, [rdxUser]);

  useEffect(() => {
    if (artists.length === 0) {
      const bringArtists = async () => {
        const fetchArtists = await GetArtists();
        const sortedArtists = fetchArtists.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setArtists(sortedArtists);
      };
      bringArtists();
    }
  });

  return (
    <div className="artistDesign">
      {/* <div className="createArtistDiv">
        <div className="titleCreateArtist">
          <h1>Create Artist</h1>
        </div>
        <div className="inputCreateArtist"></div>
      </div> */}
      <div className="titleArtists">Artists</div>
      <div className="listArtistsDiv">
        {artists.map((artist) => (
          <div key={artist.id} className="artistList">
            <div className="artistName">Name : {artist.name}</div>
            <div className="artistCountry">Country : {artist.country}</div>
            <div className="artistGenre">Genre : {artist.genre.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
