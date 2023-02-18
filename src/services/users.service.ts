import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import {
  getAll,
  GetAllDto,
  GetAllResultDto,
  getOne,
  GetOneDto,
} from "../common/functions";
import { UserDto } from "../dto/user.dto";

async function create(user: UserDto): Promise<UserDto> {
  const salt: string = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password ?? "12345678", salt);
  return (await User.create(user)) as unknown as UserDto;
}

async function findAll(
  getAllDto: GetAllDto
): Promise<GetAllResultDto<UserDto>> {
  return await getAll<UserDto>(User, getAllDto);
}

async function findOne(getOneDto: GetOneDto): Promise<UserDto | null> {
  return await getOne<UserDto>(User, getOneDto);
}

async function update(id: string, user: UserDto): Promise<UserDto | null> {
  if (user.password) {
    const salt: string = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  }

  return (await User.findByIdAndUpdate(
    id,
    { $set: { ...user } },
    { new: true }
  )) as unknown as UserDto;
}

async function remove(id: string): Promise<UserDto | null> {
  return (await User.findByIdAndDelete(id)) as unknown as UserDto;
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
