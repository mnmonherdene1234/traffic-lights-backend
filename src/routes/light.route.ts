import express from "express";
import lightsController from "../controllers/lights.controller";
const router = express.Router();

router.post("/", lightsController.create);
router.get("/", lightsController.findAll);
router.get("/:id", lightsController.findOne);
router.patch("/:id", lightsController.update);
router.delete("/:id", lightsController.remove);

export default router;
