import express from "express";
import authController from "../controllers/auth.controller";
import { cookieJwtMiddleware } from "../middlewares/cookie-jwt.middleware";
const router = express.Router();

router.post("/login", authController.login);
router.get("/profile", cookieJwtMiddleware, authController.profile);

export default router;
