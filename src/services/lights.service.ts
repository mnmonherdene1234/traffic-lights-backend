import { FindAllDto, FindAllResultDto, FindOneDto } from "../common/dto";
import { findAllFunc, findOneFunc } from "../common/functions";
import { ILight, Light } from "../models/light.model";
import { Road } from "../models/road.model";

async function create(light: ILight) {
  const road = await Road.findById(light.road);

  if (!road) {
    throw new Error("ROAD_NOT_FOUND");
  }

  const savedLight = await new Light(light).save();

  if (savedLight) {
    await Road.findByIdAndUpdate(road.id, { $push: { lights: savedLight.id } });
  }

  return savedLight as unknown as ILight;
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
  const deletedLight = (await Light.findByIdAndDelete(id)) as ILight;

  if (deletedLight) {
    await Road.findByIdAndUpdate(deletedLight.road, {
      $pull: { lights: deletedLight.id },
    });
  }

  return deletedLight as unknown as ILight;
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
