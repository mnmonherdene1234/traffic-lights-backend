import { NextFunction, Request, Response } from "express";
import { requestToGetAllDto, requestToGetOneDto } from "../common/functions";
import lightsService from "../services/lights.service";

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await lightsService.create(req.body));
  } catch (error) {
    next(error);
  }
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await lightsService.findAll(await requestToGetAllDto(req)));
  } catch (error) {
    next(error);
  }
}

async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await lightsService.findOne(await requestToGetOneDto(req)));
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await lightsService.update(req.params?.id, req.body));
  } catch (error) {
    next(error);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await lightsService.remove(req.params?.id));
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
