import express from "express";
import authController from "../controllers/auth.controller";
import { jwtMiddleware } from "../middlewares/jwt.middleware";
const router = express.Router();

router.post("/login", authController.login);
router.get("/profile", jwtMiddleware, authController.getProfile);
router.patch("/profile", jwtMiddleware, authController.setProfile);
router.post("/change-password", jwtMiddleware, authController.changePassword);

export default router;
