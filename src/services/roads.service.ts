import {
  getAll,
  GetAllDto,
  GetAllResultDto,
  getOne,
  GetOneDto,
} from "../common/functions";
import { Light } from "../models/light.model";
import { IRoad, Road } from "../models/road.model";

async function create(road: IRoad): Promise<IRoad> {
  return (await new Road(road).save()) as unknown as IRoad;
}

async function findAll(findAllDto: GetAllDto): Promise<GetAllResultDto<IRoad>> {
  return await getAll<IRoad>(Road, findAllDto);
}

async function findOne(findOneDto: GetOneDto): Promise<IRoad | null> {
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
