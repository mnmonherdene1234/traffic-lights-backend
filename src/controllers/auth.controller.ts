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
  try {
    const { id } = req.user;
    const user = await authService.profile(id);

    if (!user) {
      res.status(401).json({ error: "UNAUTHORIZED" });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}

export default {
  login,
  profile,
};
