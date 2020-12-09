import Mongoose, { Schema } from 'mongoose';
import { IToken } from '../interfaces/token.interface';
export declare const tokenSchema: Schema;
export declare const Token: Mongoose.Model<IToken>;
