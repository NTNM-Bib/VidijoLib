/// <reference types="mongoose-paginate-v2" />
import { Document, Model, Types, PaginateModel } from 'mongoose';
import { ICategory } from './category.interface';
interface IJournalDocument extends Document {
    active: boolean;
    title: string;
    issn: string;
    eissn: string;
    source: string;
    cover: string;
    useGeneratedCover: boolean;
    added: Date;
    latestPubdate: Date;
    views: number;
    updated: Date;
    categories: string[] | Types.ObjectId[] | ICategory[];
    identifier: string;
}
export interface IJournal extends IJournalDocument {
    incViews(): void;
}
export interface IJournalModel extends Model<IJournal>, PaginateModel<IJournal> {
}
export {};
