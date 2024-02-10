import { useState } from "react";
import { useVideoGamesContext } from "../hooks/useVideoGameContext";

const VideoGamesForm = () => {
  const { dispatch } = useVideoGamesContext();
  const [title, setTitle] = useState("");
  const [launchYear, setLaunchYear] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const videoGame = {
      title,
      launchYear,
      genre,
      description,
    };

    const response = await fetch("http://localhost:3000/videogames", {
      method: "POST",
      body: JSON.stringify(videoGame),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonRes = await response.json();

    if (!response.ok) {
      setError(jsonRes.error);
    }

    if (response.ok) {
      setTitle("");
      setLaunchYear("");
      setGenre("");
      setDescription("");
      setError(null);
      console.log("videogame added", jsonRes);
      dispatch({ type: "CREATE_VIDEOGAME", payload: jsonRes });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Video Game</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Launch year:</label>
      <input
        type="number"
        onChange={(e) => setLaunchYear(e.target.value)}
        value={launchYear}
      />
      <label>Genre:</label>
      <input
        type="text"
        onChange={(e) => setGenre(e.target.value)}
        value={genre}
      />
      <label>Description:</label>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button>Add Video Game</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default VideoGamesForm;
