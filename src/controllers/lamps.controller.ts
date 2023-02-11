import { NextFunction, Request, Response } from "express";
import {
  handleRequest,
  requestToGetAllDto,
  requestToGetOneDto,
} from "../common/functions";
import lampService from "../services/lamps.service";

async function create(req: Request, res: Response, next: NextFunction) {
  handleRequest(async () => await lampService.create(req.body), res, next);
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await lampService.findAll(requestToGetAllDto(req)),
    res,
    next
  );
}

async function findOne(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await lampService.findOne(requestToGetOneDto(req)),
    res,
    next
  );
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
