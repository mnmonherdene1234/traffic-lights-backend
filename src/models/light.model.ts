import mongoose from "mongoose";
import { IRoad } from "./road.model";
import timestamps from "./utils/timestamps";
import toJSON from "./utils/toJSON";

export interface ILight {
  id: string;
  name: string;
  road: IRoad;
  created_at: Date;
  updated_at: Date;
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
      ref: "roads",
      required: true,
    },
  },
  {
    toJSON,
    timestamps,
  }
);

export const Light = mongoose.model("lights", lightSchema);
