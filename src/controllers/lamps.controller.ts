import { NextFunction, Request, Response } from "express";
import { requestToFindAllDto, requestToFindOneDto } from "../common/functions";
import lampService from "../services/lamps.service";

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await lampService.create(req.body));
  } catch (error) {
    next(error);
  }
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await lampService.findAll(requestToFindAllDto(req)));
  } catch (error) {
    next(error);
  }
}

async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await lampService.findOne(requestToFindOneDto(req)));
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await lampService.update(req.params?.id, req.body));
  } catch (error) {
    next(error);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await lampService.remove(req.params?.id));
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
