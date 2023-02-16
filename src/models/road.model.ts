import mongoose from "mongoose";
import { ILight, LIGHTS_NAME } from "./light.model";
import timestamps from "./utils/timestamps";
import toJSON from "./utils/toJSON";

export interface IRoad {
  id: string;
  name: string;
  lat: number;
  lng: number;
  lights: ILight[];
  created_at: Date;
  updated_at: Date;
}

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

    lights: [
      {
        type: mongoose.Types.ObjectId,
        ref: LIGHTS_NAME,
      },
    ],
  },
  {
    toJSON,
    timestamps,
  }
);

export const Road = mongoose.model(ROADS_NAME, roadSchema);
