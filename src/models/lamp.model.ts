import mongoose from "mongoose";
import timestamps from "./utils/timestamps";
import toJSON from "./utils/toJSON";

export interface ILamp {
  id: string;
  name: string;
  image: string;
}

const lampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  {
    toJSON,
    timestamps,
  }
);

export const Lamp = mongoose.model("lamps", lampSchema);
