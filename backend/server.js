import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { VideoGame } from "./models/videoGameModel.js";

// Express app
const app = express();
app.use(express.json());

// GET all video games
app.get("/videogames", async (req, res) => {
  const videoGames = await VideoGame.find({}).sort({ createdAt: -1 });

  res.status(200).json(videoGames);
});

// GET one video game
app.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Video game not found" });
  }

  const videoGame = await VideoGame.findById(id);

  if (!videoGame) {
    return res.status(404).json({ error: "Video game not found" });
  }
  res.status(200).json(videoGame);
});

// POST video game
app.post("/videogames", async (req, res) => {
  const newVideoGame = {
    title: req.body.title,
    launchYear: req.body.launchYear,
    genre: req.body.genre,
    description: req.body.description,
  };

  try {
    await VideoGame.create(newVideoGame);
    res.status(200).json(newVideoGame);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ error: "An error occurred while creating the video game." }); // Send a generic error message to the client
  }
});

// PATCH one video game
app.patch("/videogames/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Video game not found" });
  }

  const videoGame = await VideoGame.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!videoGame) {
    return res.status(404).json({ error: "Video game not found" });
  }

  res.status(200).json(videoGame);
});

// DELETE one video game
app.delete("/videogames/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Video game not found" });
  }

  const videoGame = await VideoGame.findOneAndDelete({ _id: id });

  if (!videoGame) {
    return res.status(404).json({ error: "Video game not found" });
  }
  res.status(200).json(videoGame);
});

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `App is connected to db and listening to port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
