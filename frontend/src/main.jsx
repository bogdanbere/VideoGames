import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { WorkoutContextProvider } from "./context/VideoGamesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WorkoutContextProvider>
    <App />
  </WorkoutContextProvider>
);
