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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = exports.articleSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.articleSchema = new mongoose_1.Schema({
    publishedIn: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Journal',
    },
    doi: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
    authors: {
        type: [String],
        default: [],
    },
    abstract: {
        type: String,
        default: '',
    },
    pubdate: {
        type: Date,
        default: undefined,
    },
}, 
// Schema options
{
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
    id: false,
});
exports.articleSchema.virtual('source').get(function () {
    return `https://doi.org/${this.doi}`;
});
// Let validation fail if article with same DOI already exists
exports.articleSchema.pre('validate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const articlesWithSameDOI = yield exports.Article.find({ doi: this.doi })
            .exec()
            .catch((err) => {
            throw err;
        });
        if (articlesWithSameDOI.length > 0) {
            return next(new Error(`Article with DOI ${this.doi} already exists`));
        }
        return next();
    });
});
exports.Article = mongoose_1.default.model('Article', exports.articleSchema);
