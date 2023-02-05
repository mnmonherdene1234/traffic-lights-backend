import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface ILogin {
  username: string;
  password: string;
}

async function login(ilogin: ILogin): Promise<string | null> {
  const user = await User.findOne({
    username: ilogin.username,
  });

  if (!user) {
    return null;
  }

  if (!(await bcrypt.compare(ilogin.password, user.password))) {
    return null;
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
  profile,
};
