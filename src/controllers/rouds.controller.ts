import { NextFunction, Request, Response } from "express";
import {
  handleRequest,
  requestToGetAllDto,
  requestToGetOneDto,
} from "../common/functions";
import { RoadDto } from "../dto/road.dto";
import roadsService from "../services/roads.service";

async function create(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await roadsService.create(req.body),
    res,
    next,
    new RoadDto(req.body)
  );
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => roadsService.findAll(requestToGetAllDto(req)),
    res,
    next
  );
}

async function findOne(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await roadsService.findOne(requestToGetOneDto(req)),
    res,
    next
  );
}

async function update(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await roadsService.update(req.params.id, req.body),
    res,
    next
  );
}

async function remove(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await roadsService.remove(req.params.id),
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
