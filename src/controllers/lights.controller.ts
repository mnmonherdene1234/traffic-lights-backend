import { NextFunction, Request, Response } from "express";
import {
  handleRequest,
  requestToGetAllDto,
  requestToGetOneDto,
} from "../common/functions";
import lightsService from "../services/lights.service";

async function create(req: Request, res: Response, next: NextFunction) {
  handleRequest(async () => await lightsService.create(req.body), res, next);
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await lightsService.findAll(requestToGetAllDto(req)),
    res,
    next
  );
}

async function findOne(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await lightsService.findOne(requestToGetOneDto(req)),
    res,
    next
  );
}

async function update(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await lightsService.update(req.params.id, req.body),
    res,
    next
  );
}

async function remove(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await lightsService.remove(req.params.id),
    res,
    next
  );
}

export default {
  create,
  findAll,
  findOne,
  update,
  remove,
};
