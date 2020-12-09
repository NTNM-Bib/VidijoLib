import { Document, Model, Types } from 'mongoose';
import { ICategory } from './category.interface';
interface IJournalDocument extends Document {
    active: boolean;
    title: string;
    issn: string;
    eissn: string;
    source: string;
    cover: string;
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
export declare type IJournalModel = Model<IJournal>;
export {};
