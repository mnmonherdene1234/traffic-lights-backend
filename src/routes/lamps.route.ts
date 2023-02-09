import express from "express";
import lampsController from "../controllers/lamps.controller";
const router = express.Router();

router.post("/", lampsController.create);
router.get("/", lampsController.findAll);
router.get("/:id", lampsController.findOne);
router.patch("/:id", lampsController.update);
router.delete("/:id", lampsController.remove);

export default router;
