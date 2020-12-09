import { Document, Model } from 'mongoose';
export interface ICategory extends Document {
    title: string;
    color: string;
    display: boolean;
}
export declare type ICategoryModel = Model<ICategory>;
