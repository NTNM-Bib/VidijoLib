/// <reference types="mongoose-paginate-v2" />
import { Document, Model, Types, PaginateModel } from 'mongoose';
import { IArticle } from './article.interface';
import { IJournal } from './journal.interface';
interface IUserDocument extends Document {
    username: string;
    password: string;
    firstName: string;
    secondName: string;
    isVerified: boolean;
    passwordResetToken: string;
    passwordResetExpires: Date;
    accessLevel: 'default' | 'admin';
    lastActivity: Date;
    created: Date;
    favoriteJournals: string[] | Types.ObjectId[] | IJournal[];
    readingList: string[] | Types.ObjectId[] | IArticle[];
}
export interface IUser extends IUserDocument {
    verifyPassword(plaintextPassword: string, callback: (err: Error | null, res: boolean | null) => void): void;
    checkAccessLevel(accessLevelToCheck: 'default' | 'admin', callback: (err: Error | null, res: boolean | null) => void): void;
}
export interface IUserModel extends Model<IUser>, PaginateModel<IUser> {
}
export {};
