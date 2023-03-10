import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export function jwtMiddleware(req: any, res: Response, next: NextFunction) {
  const token: string = req.headers.authorization?.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET as string);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    res.status(401).json({
      message: "UNAUTHORIZED",
    });
  }
}
