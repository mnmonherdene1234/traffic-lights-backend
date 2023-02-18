import { NextFunction, Request, Response } from "express";
import { LoginDto } from "../dto/login.dto";
import { handleRequest } from "../common/functions";
import authService from "../services/auth.service";
import { UserDto } from "../dto/user.dto";
import { ChangePasswordDto } from "../dto/change-password.dto";

async function login(req: Request, res: Response, next: NextFunction) {
  handleRequest(
    async () => ({ token: await authService.login(req.body) }),
    res,
    next,
    new LoginDto(req.body)
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
    next,
    new UserDto(req.body)
  );
}

async function changePassword(req: any, res: Response, next: NextFunction) {
  handleRequest(
    async () => await authService.changePassword(req.user?.id, req.body),
    res,
    next,
    new ChangePasswordDto(req.body)
  );
}

export default {
  login,
  getProfile,
  setProfile,
  changePassword,
};
