"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    virtuals: true,
    versionKey: false,
    transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    },
};
