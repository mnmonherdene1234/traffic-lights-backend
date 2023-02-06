import express from "express";
import roadsController from "../controllers/rouds.controller";
const router = express.Router();

router.post("/", roadsController.create);
router.get("/", roadsController.findAll);
router.get("/:id", roadsController.findOne);
router.patch("/:id", roadsController.update);
router.delete("/:id", roadsController.remove);

export default router;
