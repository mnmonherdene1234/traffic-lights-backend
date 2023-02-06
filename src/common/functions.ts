import { Request } from "express";
import { Model } from "mongoose";
import { FindAllDto, FindOneDto } from "./dto";

export async function findAllFunc<T>(
  model: Model<any>,
  findAllDto: FindAllDto
) {
  const { filter, page, pageSize, populate, select, sort } = findAllDto;
  const data = (await model
    .find(filter)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate(populate)
    .select(select)
    .sort(sort)) as unknown as T[];

  findAllDto.total = await model.count(filter);

  return { data, meta: findAllDto };
}

export async function findOneFunc<T>(
  model: Model<any>,
  findOneDto: FindOneDto
) {
  const { id, populate, select } = findOneDto;
  return (await model
    .findById(id)
    .populate(populate)
    .select(select)) as unknown as T;
}

export async function requestToFindAllDto(req: Request): Promise<FindAllDto> {
  return {
    filter: req.query.filter || {},
    page: (req.query.page as unknown as number) || 1,
    pageSize: (req.query.pageSize as unknown as number) || 20,
    populate: (req.query.populate as unknown as string) || "",
    select: (req.query.select as unknown as string) || "",
    sort: (req.query.sort as unknown as string) || "",
    total: 0,
  };
}

export async function requestToFindOneDto(req: Request): Promise<FindOneDto> {
  return {
    id: req.params?.id,
    populate: (req.query?.populate as unknown as string) || "",
    select: (req.query?.select as unknown as string) || "",
  };
}
