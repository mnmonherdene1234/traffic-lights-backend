import { IUser, User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginDto } from "../common/dto";
import { UNAUTHORIZED } from "../errors";

async function login(loginDto: LoginDto): Promise<string | null> {
  const user = await User.findOne({
    username: loginDto.username,
  });

  if (
    !user ||
    !(await bcrypt.compare(loginDto.password ?? "", user.password))
  ) {
    throw UNAUTHORIZED;
  }

  return jwt.sign({ id: user?.id }, process.env.TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
}

async function profile(id: string): Promise<IUser | null> {
  return (await User.findById(id)) as unknown as IUser;
}

export default {
  login,
  profile,
};
