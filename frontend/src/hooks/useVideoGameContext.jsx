import { VideoGamesContext } from "../context/VideoGamesContext";
import { useContext } from "react";

export const useVideoGamesContext = () => {
  const context = useContext(VideoGamesContext);

  if (!context) {
    throw Error(
      "useVideoGamesContext must be used inside a VideoGamesContextProvider"
    );
  }

  return context;
};
