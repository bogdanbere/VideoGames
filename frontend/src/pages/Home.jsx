import React, { useEffect } from "react";
import VideoGameDetails from "../components/VideoGameDetails";
import VideoGamesForm from "../components/VideoGamesForm";
import { useVideoGamesContext } from "../hooks/useVideoGameContext";

const Home = () => {
  const { videoGames, dispatch } = useVideoGamesContext();

  useEffect(() => {
    const fetchVG = async () => {
      const response = await fetch("http://localhost:3000/videogames");
      const jsonRes = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_VIDEOGAMES", payload: jsonRes });
      }
    };

    fetchVG();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="videogames">
        {videoGames &&
          videoGames.map((videoGame) => (
            <VideoGameDetails key={videoGame._id} videoGame={videoGame} />
          ))}
      </div>
      <VideoGamesForm />
    </div>
  );
};

export default Home;
