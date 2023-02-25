import {
  getAll,
  GetAllDto,
  GetAllResultDto,
  getOne,
  GetOneDto,
} from "../common/functions";
import { RoadDto } from "../dto/road.dto";
import { Light } from "../models/light.model";
import { Road } from "../models/road.model";

async function create(road: RoadDto): Promise<RoadDto> {
  return (await new Road(road).save()) as unknown as RoadDto;
}

async function findAll(
  findAllDto: GetAllDto
): Promise<GetAllResultDto<RoadDto>> {
  return await getAll<RoadDto>(Road, findAllDto);
}

async function findOne(findOneDto: GetOneDto): Promise<RoadDto | null> {
  return await getOne<RoadDto>(Road, findOneDto);
}

async function update(id: string, road: RoadDto): Promise<RoadDto | null> {
  return (await Road.findByIdAndUpdate(
    id,
    { $set: { ...road } },
    { new: true }
  )) as RoadDto;
}

async function remove(id: string): Promise<RoadDto | null> {
  const deletedRoad = (await Road.findByIdAndDelete(id)) as RoadDto;

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
