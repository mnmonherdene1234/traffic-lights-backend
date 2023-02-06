import { FindAllDto, FindOneDto } from "../common/dto";
import { findAllFunc, findOneFunc } from "../common/functions";
import { Light } from "../models/light.model";
import { IRoad, Road } from "../models/road.model";

async function create(road: IRoad) {
  return (await new Road(road).save()) as unknown as IRoad;
}

async function findAll(findAllDto: FindAllDto) {
  return await findAllFunc<IRoad>(Road, findAllDto);
}

async function findOne(findOneDto: FindOneDto) {
  return await findOneFunc<IRoad>(Road, findOneDto);
}

async function update(id: string, light: IRoad) {
  return (await Road.findByIdAndUpdate(id, { $set: { ...light } })) as IRoad;
}

async function remove(id: string) {
  const road = (await Road.findByIdAndDelete(id)) as IRoad;

  if (road) {
    await Light.deleteMany({
      road: road.id,
    });
  }

  return road;
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
