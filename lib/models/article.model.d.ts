import Mongoose, { Schema } from 'mongoose';
import { IArticle } from '../interfaces/article.interface';
export declare const articleSchema: Schema;
export declare const Article: Mongoose.Model<IArticle>;
