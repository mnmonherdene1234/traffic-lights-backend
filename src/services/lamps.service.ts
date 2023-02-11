import { getAllDto, getOneDto } from "../common/dto";
import { getAll, getOne } from "../common/functions";
import { ILamp, Lamp } from "../models/lamp.model";

async function create(lamp: ILamp): Promise<ILamp> {
  return (await Lamp.create(lamp)) as ILamp;
}

async function findAll(getAllDto: getAllDto): Promise<{
  data: unknown[];
  meta: getAllDto;
}> {
  return await getAll(Lamp, getAllDto);
}

async function findOne(getOneDto: getOneDto): Promise<ILamp | null> {
  return await getOne(Lamp, getOneDto);
}

async function update(id: string, lamp: ILamp): Promise<ILamp | null> {
  return (await Lamp.findByIdAndUpdate(
    id,
    { $set: { ...lamp } },
    { new: true }
  )) as ILamp;
}

async function remove(id: string): Promise<ILamp | null> {
  return (await Lamp.findByIdAndDelete(id)) as ILamp;
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
