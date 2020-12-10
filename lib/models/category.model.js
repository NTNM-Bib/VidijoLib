"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.categorySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.categorySchema = new mongoose_2.Schema({
    title: {
        type: String,
        minlength: [3, 'Category.title must be at least 3 characters long'],
        required: [true, 'Category.title is required'],
        unique: [true, 'Category with this title already exists'],
    },
    color: {
        type: String,
        default: '#0099ff',
    },
    display: {
        type: Boolean,
        default: false,
    },
});
exports.categorySchema.plugin(mongoose_paginate_v2_1.default);
exports.Category = mongoose_1.default.model('Category', exports.categorySchema);
