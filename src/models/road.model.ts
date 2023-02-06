import mongoose from "mongoose";
import { ILight } from "./light.model";
import timestamps from "./utils/timestamps";
import toJSON from "./utils/toJSON";

export interface IRoad {
  id: string;
  name: string;
  lights: ILight[];
  created_at: Date;
  updated_at: Date;
}

const roadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lights: [
      {
        type: mongoose.Types.ObjectId,
        ref: "lights",
      },
    ],
  },
  {
    toJSON,
    timestamps,
  }
);

export const Road = mongoose.model("roads", roadSchema);
