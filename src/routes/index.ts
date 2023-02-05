import express, { Request, Response } from "express";
import usersRoute from "./users.route";
import authRoute from "./auth.route";

const router = express.Router();

router.use("/users", usersRoute);
router.use("/auth", authRoute);

router.all("*", (_req: Request, res: Response) => {
  res.status(404).json({
    message: "NOT_FOUND",
  });
});

export default router;
