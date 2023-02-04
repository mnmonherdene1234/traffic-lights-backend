import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

interface ILogin {
  username: string;
  password: string;
}

async function login(ilogin: ILogin) {
  const user = await User.findOne({
    username: ilogin.username,
    password: ilogin.password,
  });

  if (!user) {
    return "";
  }

  return jwt.sign({ id: user?.id }, process.env.TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
}

async function profile(id: string) {
  const user = await User.findById(id);
  return user;
}

export default {
  login,
  profile
};
