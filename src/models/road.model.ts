import mongoose from "mongoose";
import timestamps from "./utils/timestamps";
import toJSON from "./utils/toJSON";

export const ROADS_NAME: string = "roads";

const roadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    lat: {
      type: Number,
      require: true,
    },

    lng: {
      type: Number,
      require: true,
    },
  },
  {
    toJSON,
    timestamps,
  }
);

export const Road = mongoose.model(ROADS_NAME, roadSchema);
