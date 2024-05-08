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
        setArtists(fetchArtists.data);
      };
      bringArtists();
    }
  });

  return (
    <div className="artistDesign">
      <div className="createArtistDiv">
        <div className="titleCreateArtist">Crear Artista</div>
        <div className="inputCreateArtist"></div>
      </div>
      <div className="listArtistsDiv">
        {artists.map((artist) => (
          <div className="artistList">
            <div className="artistName">{artist.name}</div>
            <div className="artistCountry">{artist.country}</div>
            <div className="artistGenre">{artist.genre.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
