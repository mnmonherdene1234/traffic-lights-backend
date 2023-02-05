import express from "express";
import usersController from "../controllers/users.controller";
import { cookieJwtMiddleware } from "../middlewares/cookie-jwt.middleware";

const router = express.Router();

router.use(cookieJwtMiddleware);

router.post("/", usersController.create);
router.get("/", usersController.findAll);
router.get("/:id", usersController.findOne);
router.patch("/:id", usersController.update);
router.delete("/:id", usersController.remove);

export default router;
