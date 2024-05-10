import ReactPlayer from "react-player";
import "./Home.css";
import YouTubePlayer from "react-player/youtube";

export const Home = () => {
  return (
    <div className="homeVideoDesign">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=_TkbeeSZNWI&t=12s"
        loop
        playing
        height={"73%"}
        width={"56%"}
      />
    </div>
  );
};
