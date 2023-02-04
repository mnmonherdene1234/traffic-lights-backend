"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const toJSON_1 = __importDefault(require("./utils/toJSON"));
const timestamps_1 = __importDefault(require("./utils/timestamps"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    toJSON: toJSON_1.default,
    timestamps: timestamps_1.default,
});
exports.User = mongoose_1.default.model("users", userSchema);
