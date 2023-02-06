import express, { Request, Response } from "express";
import usersRoute from "./users.route";
import authRoute from "./auth.route";
import lightsRoute from "./light.route";
import { jwtMiddleware } from "../middlewares/jwt.middleware";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", jwtMiddleware, usersRoute);
router.use("/lights", jwtMiddleware, lightsRoute);

router.all("*", (_req: Request, res: Response) => {
  res.status(404).json({
    message: "NOT_FOUND",
  });
});

export default router;
