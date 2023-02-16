import {
  getAll,
  getAllDto,
  getAllResultDto,
  getOne,
  getOneDto,
} from "../common/functions";
import { Light } from "../models/light.model";
import { IRoad, Road } from "../models/road.model";

async function create(road: IRoad): Promise<IRoad> {
  return (await new Road(road).save()) as unknown as IRoad;
}

async function findAll(findAllDto: getAllDto): Promise<getAllResultDto<IRoad>> {
  return await getAll<IRoad>(Road, findAllDto);
}

async function findOne(findOneDto: getOneDto): Promise<IRoad | null> {
  return await getOne<IRoad>(Road, findOneDto);
}

async function update(id: string, road: IRoad): Promise<IRoad | null> {
  return (await Road.findByIdAndUpdate(
    id,
    { $set: { ...road } },
    { new: true }
  )) as IRoad;
}

async function remove(id: string): Promise<IRoad | null> {
  const deletedRoad = (await Road.findByIdAndDelete(id)) as IRoad;

  if (deletedRoad) {
    await Light.deleteMany({ road: deletedRoad.id });
  }

  return deletedRoad;
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
