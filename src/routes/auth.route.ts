import express from "express";
import authController from "../controllers/auth.controller";
import { jwtMiddleware } from "../middlewares/jwt.middleware";
const router = express.Router();

router.post("/login", authController.login);
router.get("/profile", jwtMiddleware, authController.profile);

export default router;
