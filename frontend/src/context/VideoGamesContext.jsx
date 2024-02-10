import { createContext, useReducer } from "react";

export const VideoGamesContext = createContext();

export const videoGamesReducer = (state, action) => {
  switch (action.type) {
    case "SET_VIDEOGAMES":
      return { videoGames: action.payload };
    case "CREATE_VIDEOGAME":
      return { videoGames: [action.payload, ...state.videoGames] };
    case "DELETE_VIDEOGAME":
      return {
        videoGames: state.videoGames.filter((vg) => {
          vg._id !== action.payload._id;
        }),
      };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoGamesReducer, { videoGames: null });

  return (
    <VideoGamesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </VideoGamesContext.Provider>
  );
};
