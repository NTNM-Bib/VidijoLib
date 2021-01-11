"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.Journal = exports.journalSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.journalSchema = new mongoose_1.Schema({
    active: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        required: true,
    },
    issn: {
        type: String,
    },
    eissn: {
        type: String,
    },
    source: {
        type: String,
        default: '',
    },
    cover: {
        type: String,
        default: '',
    },
    useGeneratedCover: {
        type: Boolean,
        default: false,
    },
    added: {
        type: Date,
    },
    latestPubdate: {
        type: Date,
    },
    views: {
        type: Number,
        default: 0,
    },
    updated: {
        type: Date,
    },
    categories: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Category',
            default: [],
        },
    ],
}, {
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
    id: false,
});
exports.journalSchema.virtual('identifier').get(function () {
    return this.issn ? this.issn : this.eissn ? this.eissn : '';
});
exports.journalSchema.pre('save', function (next) {
    this.added = new Date();
    return next();
});
exports.journalSchema.method('incViews', function () {
    this.update({ $inc: { views: 1 } })
        .exec()
        .catch((err) => {
        throw err;
    });
});
exports.journalSchema.plugin(mongoose_paginate_v2_1.default);
exports.Journal = mongoose_1.default.model('Journal', exports.journalSchema);
