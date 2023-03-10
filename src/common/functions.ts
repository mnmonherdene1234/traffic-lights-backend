import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

export class GetAllDto {
  filter: any = {};
  page: number = 1;
  page_size: number = 20;
  total: number = 0;
  total_page: number = 0;
  populate: any = {};
  sort: any = {};
  select: any = {};
}

export class GetAllResultDto<T> {
  data: T[] = [];
  meta: GetAllDto = new GetAllDto();
}

export class GetOneDto {
  id: string = "";
  populate?: any;
  select?: any;
}

export async function getAll<T>(
  model: Model<any>,
  getAllDto: GetAllDto
): Promise<GetAllResultDto<T>> {
  getAllDto.page = parseInt(getAllDto.page as unknown as string) || 1;
  getAllDto.page_size =
    parseInt(getAllDto.page_size as unknown as string) || 20;

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
  findOneDto: GetOneDto
): Promise<T | null> {
  const { id, populate, select } = findOneDto;
  return (await model
    .findById(id)
    .populate(populate)
    .select(select)) as unknown as T;
}

export function requestToGetAllDto(req: Request): GetAllDto {
  let filter: any = {};
  let page = 1;
  let page_size = Infinity;
  let populate = "";
  let select = "";
  let sort = "";

  if (req.query.filter) {
    filter = JSON.parse(JSON.stringify(req.query.filter));
  }

  if (req.query.page) {
    const parsedPage = parseInt(req.query.page.toString());
    if (!isNaN(parsedPage)) {
      page = parsedPage > 0 ? parsedPage : 1;
    }
  }

  if (req.query.page_size) {
    const parsedPageSize = parseInt(req.query.page_size.toString());
    if (!isNaN(parsedPageSize)) {
      page_size = parsedPageSize > 0 ? parsedPageSize : Infinity;
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
    page_size,
    populate,
    select,
    sort,
    total: 0,
    total_page: 0,
  };
}

export function requestToGetOneDto(req: Request): GetOneDto {
  const id: string = req.params?.id;
  const populate: string | undefined = req.query?.populate?.toString();
  const select: string | undefined = req.query?.select?.toString();

  return { id, populate, select };
}

export async function handleRequest<T>(
  fn: () => Promise<T>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await fn();
    res.json(result);
  } catch (error) {
    next(error);
  }
}
