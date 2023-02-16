import {
  getAll,
  GetAllDto,
  GetAllResultDto,
  getOne,
  GetOneDto,
} from "../common/functions";
import { ROAD_NOT_FOUND } from "../errors";
import { ILight, Light } from "../models/light.model";
import { Road } from "../models/road.model";

async function create(light: ILight): Promise<ILight> {
  const road = await Road.findById(light.road);

  if (!road) {
    throw ROAD_NOT_FOUND;
  }

  const createdLight = (await Light.create(light)) as unknown as ILight;
  await Road.findByIdAndUpdate(road.id, { $push: { lights: createdLight.id } });
  return createdLight;
}

async function findAll(getAllDto: GetAllDto): Promise<GetAllResultDto<ILight>> {
  return await getAll<ILight>(Light, getAllDto);
}

async function findOne(getOneDto: GetOneDto): Promise<ILight | null> {
  return await getOne<ILight>(Light, getOneDto);
}

async function update(id: string, light: ILight): Promise<ILight | null> {
  return (await Light.findByIdAndUpdate(
    id,
    { $set: { ...light } },
    { new: true }
  )) as ILight;
}

async function remove(id: string): Promise<ILight | null> {
  const light = await Light.findByIdAndDelete(id);
  if (!light) {
    return null;
  }

  await Road.updateOne(
    { _id: light.road },
    {
      $pull: { lights: light.id },
    }
  );

  return light as unknown as ILight;
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
