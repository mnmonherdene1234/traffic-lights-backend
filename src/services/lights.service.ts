import { getAllDto, getAllResultDto, getOneDto } from "../common/dto";
import { getAll, getOne } from "../common/functions";
import { ILight, Light } from "../models/light.model";
import { Road } from "../models/road.model";

async function create(light: ILight): Promise<ILight> {
  const road = await Road.findById(light.road);

  if (!road) {
    throw new Error("ROAD_NOT_FOUND");
  }

  const createdLight = (await Light.create(light)) as unknown as ILight;
  await Road.findByIdAndUpdate(road.id, { $push: { lights: createdLight.id } });
  return createdLight;
}

async function findAll(
  findAllDto: getAllDto
): Promise<getAllResultDto<ILight>> {
  return await getAll<ILight>(Light, findAllDto);
}

async function findOne(findOneDto: getOneDto): Promise<ILight | null> {
  return await getOne<ILight>(Light, findOneDto);
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
