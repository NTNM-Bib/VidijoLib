import Mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
export declare const userSchema: Schema;
export declare const User: Mongoose.Model<IUser, {}>;
