import { NextFunction, Request, Response } from "express";
import { LoginDto } from "../common/dto";
import { handleRequest } from "../common/functions";
import authService from "../services/auth.service";

async function login(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => ({ token: await authService.login(req.body) }),
    res,
    next,
    new LoginDto(req.body)
  );
}

async function profile(req: any, res: Response, next: NextFunction) {
  handleRequest(async () => await authService.profile(req.user?.id), res, next);
}

export default {
  login,
  profile,
};
