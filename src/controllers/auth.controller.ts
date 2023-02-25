import { NextFunction, Request, Response } from "express";
import { handleRequest } from "../common/functions";
import authService from "../services/auth.service";

async function login(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => ({ token: await authService.login(req.body) }),
    res,
    next
  );
}

async function getProfile(req: any, res: Response, next: NextFunction) {
  handleRequest(
    async () => await authService.getProfile(req.user?.id),
    res,
    next
  );
}

async function setProfile(req: any, res: Response, next: NextFunction) {
  handleRequest(
    async () => await authService.setProfile(req.user?.id, req.body),
    res,
    next
  );
}

async function changePassword(req: any, res: Response, next: NextFunction) {
  handleRequest(
    async () => await authService.changePassword(req.user?.id, req.body),
    res,
    next
  );
}

export default {
  login,
  getProfile,
  setProfile,
  changePassword,
};
