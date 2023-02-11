import mongoose from "mongoose";
import timestamps from "./utils/timestamps";

export interface IUser {
  id: string;
  username: string;
  password: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export const USERS_NAME: string = "users";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
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
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        return ret;
      },
    },
    timestamps,
  }
);

export const User = mongoose.model(USERS_NAME, userSchema);
