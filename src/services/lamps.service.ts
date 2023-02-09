import { FindAllDto, FindOneDto } from "../common/dto";
import { findAllFunc, findOneFunc } from "../common/functions";
import { ILamp, Lamp } from "../models/lamp.model";

async function create(lamp: ILamp) {
  return await new Lamp(lamp).save();
}

async function findAll(findAllDto: FindAllDto) {
  return await findAllFunc(Lamp, findAllDto);
}

async function findOne(findOneDto: FindOneDto) {
  return await findOneFunc(Lamp, findOneDto);
}

async function update(id: string, lamp: ILamp) {
  return await Lamp.findByIdAndUpdate(id, { $set: { ...lamp } });
}

async function remove(id: string) {
  return await Lamp.findByIdAndDelete(id);
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
