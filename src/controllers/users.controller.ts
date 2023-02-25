import { NextFunction, Request, Response } from "express";
import {
  handleRequest,
  requestToGetAllDto,
  requestToGetOneDto,
} from "../common/functions";
import usersService from "../services/users.service";

async function create(req: Request, res: Response, next: NextFunction) {
  handleRequest(async () => await usersService.create(req.body), res, next);
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await usersService.findAll(requestToGetAllDto(req)),
    res,
    next
  );
}

async function findOne(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await usersService.findOne(requestToGetOneDto(req)),
    res,
    next
  );
}

async function update(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await usersService.update(req.params.id, req.body),
    res,
    next
  );
}

async function remove(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => await usersService.remove(req.params.id),
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
