"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const error_middleware_1 = require("./src/middlewares/error.middleware");
const mongoose_1 = __importDefault(require("mongoose"));
const users_route_1 = __importDefault(require("./src/routes/users.route"));
const morgan_1 = __importDefault(require("morgan"));
// @ts-ignore
const express_routes_1 = require("express-routes");
const express_rate_limit_1 = __importStar(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
console.time("start");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
console.time("database");
mongoose_1.default.connect(process.env.MONGODB, {}, () => {
    console.log(`\x1b[32mconnected to database`);
    console.timeEnd("database");
});
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/v1/api/users", users_route_1.default);
app.all("*", (req, res) => {
    res.status(404).json({
        message: "NOT_FOUND",
    });
});
app.use(error_middleware_1.errorMiddleware);
app.use((0, helmet_1.default)());
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    store: new express_rate_limit_1.MemoryStore(),
});
app.use(apiLimiter);
app.listen(port, () => {
    console.log(`\x1b[35m⚡️[server]: Server is running at http://localhost:${port}`);
    console.timeEnd("start");
    (0, express_routes_1.getEndpoints)(app).forEach((route) => {
        if (route.path != "*") {
            route.methods.forEach((method) => console.log(`\x1b[33m${new Date().toISOString()} \x1b[32m${method}\t\x1b[35m${route.path}`));
        }
    });
});
