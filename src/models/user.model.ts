import mongoose from "mongoose";
import toJSON from "./utils/toJSON";
import timestamps from "./utils/timestamps";

export interface IUser {
  id: string;
  username: string;
  password: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    toJSON,
    timestamps,
  }
);

export const User = mongoose.model("users", userSchema);
