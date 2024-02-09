import mongoose from "mongoose";

const videoGameSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    launchYear: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const VideoGame = mongoose.model("videoGame", videoGameSchema);
