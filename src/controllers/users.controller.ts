import { NextFunction, Request, Response } from "express";
import { requestToFindAllDto, requestToFindOneDto } from "../common/functions";
import usersService from "../services/users.service";

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.create(req.body));
  } catch (error) {
    next(error);
  }
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.findAll(await requestToFindAllDto(req)));
  } catch (error) {
    next(error);
  }
}

async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.findOne(await requestToFindOneDto(req)));
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.update(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.remove(req.params.id));
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
