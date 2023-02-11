import { IUser, User } from "../models/user.model";
import bcrypt from "bcrypt";
import { getAllDto, getAllResultDto, getOneDto } from "../common/dto";
import { getAll, getOne } from "../common/functions";

async function create(user: IUser): Promise<IUser> {
  const salt: string = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  return (await User.create(user)) as unknown as IUser;
}

async function findAll(getAllDto: getAllDto): Promise<getAllResultDto<IUser>> {
  return await getAll<IUser>(User, getAllDto);
}

async function findOne(getOneDto: getOneDto): Promise<IUser | null> {
  return await getOne<IUser>(User, getOneDto);
}

async function update(id: string, user: IUser): Promise<IUser | null> {
  if (user.password) {
    const salt: string = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  }

  return (await User.findByIdAndUpdate(
    id,
    { $set: { ...user } },
    { new: true }
  )) as unknown as IUser;
}

async function remove(id: string): Promise<IUser | null> {
  return (await User.findByIdAndDelete(id)) as unknown as IUser;
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
