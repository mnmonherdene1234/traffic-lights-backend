"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
const loggingMiddleware = (req, res, next) => {
    res.on("finish", function () {
        console.log(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
    });
    next();
};
exports.loggingMiddleware = loggingMiddleware;
