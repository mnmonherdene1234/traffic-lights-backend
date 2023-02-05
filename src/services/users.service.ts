import { IUser, User } from "../models/user.model";
import bcrypt from "bcrypt";

async function create(user: IUser) {
  const salt: string = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  return await new User(user).save();
}

async function findAll() {
  return await User.find();
}

async function findOne(id: string) {
  return await User.findById(id);
}

async function update(id: string, user: IUser) {
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
