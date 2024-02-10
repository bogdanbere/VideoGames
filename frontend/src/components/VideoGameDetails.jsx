import { useVideoGamesContext } from "../hooks/useVideoGameContext";

const VideoGameDetails = ({ videoGame }) => {
  const { dispatch } = useVideoGamesContext();

  const handleClick = async () => {
    const response = await fetch(
      `http://localhost:3000/videogames/${videoGame._id}`,
      { method: "DELETE" }
    );
    const jsonRes = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_VIDEOGAME", payload: jsonRes });
    }
  };

  return (
    <div className="videogames-details">
      <h4>{videoGame.title}</h4>
      <p>
        <strong>Launch year: </strong>
        {videoGame.launchYear}
      </p>
      <p>
        <strong>Genre: </strong>
        {videoGame.genre}
      </p>
      <p>
        <strong>Description: </strong>
        {videoGame.description}
      </p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default VideoGameDetails;
