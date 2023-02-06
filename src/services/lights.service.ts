import { FindAllDto, FindAllResultDto, FindOneDto } from "../common/dto";
import { findAllFunc, findOneFunc } from "../common/functions";
import { ILight, Light } from "../models/light.model";
import { Road } from "../models/road.model";

async function create(light: ILight) {
  const road = await Road.exists(light.road);

  if (!road) {
    throw new Error("ROAD_NOT_FOUND");
  }

  return (await new Light(light).save()) as unknown as ILight;
}

async function findAll(findAllDto: FindAllDto) {
  return await findAllFunc<ILight>(Light, findAllDto);
}

async function findOne(findOneDto: FindOneDto) {
  return await findOneFunc<ILight>(Light, findOneDto);
}

async function update(id: string, light: ILight) {
  return (await Light.findByIdAndUpdate(id, { $set: { ...light } })) as ILight;
}

async function remove(id: string) {
  return (await Light.findByIdAndDelete(id)) as ILight;
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
