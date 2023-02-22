import express, { Request, Response } from "express";
import usersRoute from "./users.route";
import authRoute from "./auth.route";
import lightsRoute from "./lights.route";
import roadsRoute from "./roads.route";
import { jwtMiddleware } from "../middlewares/jwt.middleware";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", jwtMiddleware, usersRoute);
router.use("/lights", jwtMiddleware, lightsRoute);
router.use("/roads", jwtMiddleware, roadsRoute);

router.all("*", (_req: Request, res: Response) => {
  res.status(404).json({
    message: "NOT_FOUND",
  });
});

export default router;
