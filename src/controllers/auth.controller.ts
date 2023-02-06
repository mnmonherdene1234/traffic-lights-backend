import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const token = await authService.login(req.body);

    if (token) {
      res.json({
        token: token,
      });
    } else {
      res.status(401).json({
        message: "UNAUTHORIZED",
      });
    }
  } catch (error) {
    next(error);
  }
}

async function profile(req: any, res: Response, next: NextFunction) {
  try {
    const user = await authService.profile(req.user.id);
    if (!user) {
      res.status(401).json({
        message: "UNAUTHORIZED",
      });
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
