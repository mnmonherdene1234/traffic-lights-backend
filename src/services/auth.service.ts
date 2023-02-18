import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginDto } from "../dto/login.dto";
import { PASSWORD_NOT_MATCH, UNAUTHORIZED, USER_NOT_FOUND } from "../errors";
import { UserDto } from "../dto/user.dto";
import { ChangePasswordDto } from "../dto/change-password.dto";

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

async function getProfile(id: string): Promise<UserDto | null> {
  return (await User.findById(id)) as unknown as UserDto;
}

async function setProfile(id: string, userDto: UserDto): Promise<UserDto> {
  delete userDto.username;
  delete userDto.password;

  return (await User.findByIdAndUpdate(
    id,
    { $set: { ...userDto } },
    { new: true }
  )) as UserDto;
}

async function changePassword(
  id: string,
  changePasswordDto: ChangePasswordDto
): Promise<UserDto> {
  const { current_password, new_password } = changePasswordDto;
  const user = await User.findById(id);

  if (!user) {
    throw USER_NOT_FOUND;
  }

  if (!(await bcrypt.compare(current_password, user.password))) {
    throw PASSWORD_NOT_MATCH;
  }

  const salt: string = await bcrypt.genSalt();
  user.password = await bcrypt.hash(new_password, salt);

  return (await user.save()) as unknown as UserDto;
}

export default {
  login,
  getProfile,
  setProfile,
  changePassword,
};
