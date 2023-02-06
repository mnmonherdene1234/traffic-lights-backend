import { IUser, User } from "../models/user.model";
import bcrypt from "bcrypt";
import { FindAllDto, FindOneDto } from "../common/dto";
import { findAllFunc, findOneFunc } from "../common/functions";

async function create(user: IUser) {
  const salt: string = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  return await new User(user).save();
}

async function findAll(findAllDto: FindAllDto) {
  return await findAllFunc(User, findAllDto);
}

async function findOne(findOneDto: FindOneDto) {
  return await findOneFunc(User, findOneDto);
}

async function update(id: string, user: IUser) {
  if (user.password) {
    const salt: string = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  }

  return await User.findByIdAndUpdate(id, { $set: { ...user } });
}

async function remove(id: string) {
  return await User.findByIdAndDelete(id);
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
