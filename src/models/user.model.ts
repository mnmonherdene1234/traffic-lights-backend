import mongoose from "mongoose";
import timestamps from "./utils/timestamps";

export const USERS_NAME: string = "users";

export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
}

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

    role: {
      type: String,
      enem: UserRole,
      default: UserRole.User,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
    },

    email: {
      type: String,
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
