import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { ValidationDto } from "../dto/validation.dto";

export class getAllDto {
  filter: any = {};
  page: number = 1;
  page_size: number = 20;
  total: number = 0;
  total_page: number = 0;
  populate: any = {};
  sort: any = {};
  select: any = {};
}

export class getAllResultDto<T> {
  data: T[] = [];
  meta: getAllDto = new getAllDto();
}

export class getOneDto {
  id: string = "";
  populate: string = "";
  select: string = "";
}

export async function getAll<T>(
  model: Model<any>,
  getAllDto: getAllDto
): Promise<getAllResultDto<T>> {
  if (getAllDto.page < 1) {
    getAllDto.page = 1;
  }

  if (getAllDto.page_size < 1) {
    getAllDto.page_size = 1;
  }

  const { filter, page, page_size, populate, select, sort } = getAllDto;

  const data = (await model
    .find(filter)
    .skip((page - 1) * page_size)
    .limit(page_size)
    .populate(populate)
    .select(select)
    .sort(sort)) as T[];

  getAllDto.total = await model.countDocuments(filter);
  getAllDto.total_page = Math.ceil(getAllDto.total / page_size);

  return { data, meta: getAllDto };
}

export async function getOne<T>(
  model: Model<any>,
  findOneDto: getOneDto
): Promise<T | null> {
  const { id, populate, select } = findOneDto;
  return (await model
    .findById(id)
    .populate(populate)
    .select(select)) as unknown as T;
}

export function requestToGetAllDto(req: Request): getAllDto {
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
    page_size: pageSize,
    populate,
    select,
    sort,
    total: 0,
    total_page: 0,
  };
}

export function requestToGetOneDto(req: Request): getOneDto {
  const id = req.params?.id;
  const populate: string = req.query?.populate?.toString() || "";
  const select: string = req.query?.select?.toString() || "";

  return { id, populate, select };
}

export async function handleRequest<T>(
  fn: () => Promise<T>,
  res: Response,
  next: NextFunction,
  validationDto?: ValidationDto
): Promise<void> {
  try {
    if (validationDto) {
      try {
        await validationDto.validateAsync();
      } catch (error: any) {
        error.statusCode = 400;
        next(error);
        return;
      }
    }

    const result = await fn();
    res.json(result);
  } catch (error) {
    next(error);
  }
}
