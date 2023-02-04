"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield users_service_1.default.create(req.body));
        }
        catch (error) {
            console.error(error.message);
            next(error);
        }
    });
}
function findAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield users_service_1.default.findAll());
        }
        catch (error) {
            console.error(error.message);
            next(error);
        }
    });
}
function findOne(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield users_service_1.default.findOne(req.params.id));
        }
        catch (error) {
            console.error(error.message);
            next(error);
        }
    });
}
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield users_service_1.default.update(req.params.id, req.body));
        }
        catch (error) {
            console.error(error.message);
            next(error);
        }
    });
}
function remove(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield users_service_1.default.remove(req.params.id));
        }
        catch (error) {
            console.error(error.message);
            next(error);
        }
    });
}
exports.default = {
    create,
    findAll,
    findOne,
    update,
    remove,
};
