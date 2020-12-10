/// <reference types="mongoose-paginate-v2" />
import { Document, Model, Types, PaginateModel } from 'mongoose';
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
export interface IArticleModel extends Model<IArticle>, PaginateModel<IArticle> {
}
