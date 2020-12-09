import { Document, Model, Types } from 'mongoose';
import { IJournal } from './journal.interface';
export interface IArticle extends Document {
    doi: string;
    publishedIn: Types.ObjectId | string | IJournal;
    title: string;
    authors: string[];
    abstract: string;
    source: string;
    pubdate: Date;
}
export declare type IArticleModel = Model<IArticle>;
