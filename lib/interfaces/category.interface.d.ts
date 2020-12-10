/// <reference types="mongoose-paginate-v2" />
import { Document, Model, PaginateModel } from 'mongoose';
export interface ICategory extends Document {
    title: string;
    color: string;
    display: boolean;
}
export interface ICategoryModel extends Model<ICategory>, PaginateModel<ICategory> {
}
