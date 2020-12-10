import Mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';
export declare const categorySchema: Schema;
export declare const Category: Mongoose.Model<ICategory, {}>;
