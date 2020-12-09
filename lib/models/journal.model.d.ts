import Mongoose, { Schema } from 'mongoose';
import { IJournal } from '../interfaces/journal.interface';
export declare const journalSchema: Schema;
export declare const Journal: Mongoose.Model<IJournal>;
