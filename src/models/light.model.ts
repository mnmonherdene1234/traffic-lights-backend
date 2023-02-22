import mongoose from "mongoose";
import { IRoad, ROADS_NAME } from "./road.model";
import timestamps from "./utils/timestamps";
import toJSON from "./utils/toJSON";

export const LIGHTS_NAME: string = "lights";

export enum LightType {
  Two = "TWO",
  Three = "THREE",
  Four = "FOUR",
}

const lightSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    road: {
      type: mongoose.Types.ObjectId,
      ref: ROADS_NAME,
      required: true,
    },

    type: {
      type: String,
      enum: LightType,
      default: LightType.Three,
    },

    x: {
      type: Number,
      required: true,
    },

    y: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON,
    timestamps,
  }
);

export const Light = mongoose.model(LIGHTS_NAME, lightSchema);
