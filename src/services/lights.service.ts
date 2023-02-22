import {
  getAll,
  GetAllDto,
  GetAllResultDto,
  getOne,
  GetOneDto,
} from "../common/functions";
import { LightDto } from "../dto/light.dto";
import { ROAD_NOT_FOUND } from "../errors";
import { Light } from "../models/light.model";
import { Road } from "../models/road.model";

async function create(light: LightDto): Promise<LightDto> {
  const road = await Road.findById(light.road);

  if (!road) {
    throw ROAD_NOT_FOUND;
  }

  const createdLight = (await Light.create(light)) as unknown as LightDto;
  await Road.findByIdAndUpdate(road.id, { $push: { lights: createdLight.id } });
  return createdLight;
}

async function findAll(
  getAllDto: GetAllDto
): Promise<GetAllResultDto<LightDto>> {
  return await getAll<LightDto>(Light, getAllDto);
}

async function findOne(getOneDto: GetOneDto): Promise<LightDto | null> {
  return await getOne<LightDto>(Light, getOneDto);
}

async function update(id: string, light: LightDto): Promise<LightDto | null> {
  return (await Light.findByIdAndUpdate(
    id,
    { $set: { ...light } },
    { new: true }
  )) as LightDto;
}

async function remove(id: string): Promise<LightDto | null> {
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

  return light as unknown as LightDto;
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
