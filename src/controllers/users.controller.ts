import { NextFunction, Request, Response } from "express";
import usersService from "../services/users.service";

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.create(req.body));
  } catch (error: any) {
    console.error(error.message);
    next(error);
  }
}

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.findAll());
  } catch (error: any) {
    console.error(error.message);
    next(error);
  }
}

async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.findOne(req.params.id));
  } catch (error: any) {
    console.error(error.message);
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.update(req.params.id, req.body));
  } catch (error: any) {
    console.error(error.message);
    next(error);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await usersService.remove(req.params.id));
  } catch (error: any) {
    console.error(error.message);
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
