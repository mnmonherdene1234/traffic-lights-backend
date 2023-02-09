import { Request } from "express";
import { Model } from "mongoose";
import { FindAllDto, FindOneDto } from "./dto";

export async function findAllFunc<T>(
  model: Model<any>,
  findAllDto: FindAllDto
): Promise<{ data: T[]; meta: FindAllDto }> {
  if (findAllDto.page < 1) {
    findAllDto.page = 1;
  }

  if (findAllDto.pageSize < 1) {
    findAllDto.pageSize = 1;
  }

  const { filter, page, pageSize, populate, select, sort } = findAllDto;

  const data = (await model
    .find(filter)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate(populate)
    .select(select)
    .sort(sort)) as T[];

  findAllDto.total = await model.countDocuments(filter);

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

export function requestToFindAllDto(req: Request): FindAllDto {
  let filter: object = {};
  let page = 1;
  let pageSize = 20;
  let populate = "";
  let select = "";
  let sort = "";

  if (req.query.filter) {
    try {
      filter = JSON.parse(req.query.filter.toString());
    } catch (error) {
      console.error(error);
    }
  }

  if (req.query.page) {
    const parsedPage = parseInt(req.query.page.toString());
    if (!isNaN(parsedPage)) {
      page = parsedPage > 0 ? parsedPage : 1;
    }
  }

  if (req.query.pageSize) {
    const parsedPageSize = parseInt(req.query.pageSize.toString());
    if (!isNaN(parsedPageSize)) {
      pageSize = parsedPageSize > 0 ? parsedPageSize : 20;
    }
  }

  if (req.query.populate) {
    populate = req.query.populate.toString();
  }

  if (req.query.select) {
    select = req.query.select.toString();
  }

  if (req.query.sort) {
    sort = req.query.sort.toString();
  }

  return {
    filter,
    page,
    pageSize,
    populate,
    select,
    sort,
    total: 0,
  };
}

export function requestToFindOneDto(req: Request): FindOneDto {
  const id = req.params?.id;
  const populate: string = req.query?.populate?.toString() || "";
  const select: string = req.query?.select?.toString() || "";

  return { id, populate, select };
}
