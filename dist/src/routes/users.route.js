"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const jwt_middleware_1 = require("../middlewares/jwt.middleware");
const router = express_1.default.Router();
router.post("/", users_controller_1.default.create);
router.get("/", users_controller_1.default.findAll);
router.get("/:id", users_controller_1.default.findOne);
router.patch("/:id", users_controller_1.default.update);
router.delete("/:id", users_controller_1.default.remove);
router.use(jwt_middleware_1.jwtMiddleware);
exports.default = router;
