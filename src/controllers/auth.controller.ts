import { Request, Response } from "express";
import authService from "../services/auth.service";

async function login(req: Request, res: Response) {
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
}

async function profile(req: any, res: Response) {
  const user = await authService.profile(req.user.id);
  if (!user) {
    res.status(401).json({
      message: "UNAUTHORIZED",
    });
  }

  res.json(user);
}

export default {
  login,
  profile,
};
