import { Document, Model, Types } from 'mongoose'
import { IArticle } from './article.interface'
import { IJournal } from './journal.interface'

interface IUserDocument extends Document {
  // General
  username: string
  password: string
  firstName: string
  secondName: string

  // Technical
  isVerified: boolean
  passwordResetToken: string
  passwordResetExpires: Date
  accessLevel: 'default' | 'admin'
  lastActivity: Date
  created: Date

  // Content
  favoriteJournals: string[] | Types.ObjectId[] | IJournal[]
  readingList: string[] | Types.ObjectId[] | IArticle[]
}

export interface IUser extends IUserDocument {
  verifyPassword(plaintextPassword: string, callback: (err: Error | null, res: boolean | null) => void): void
  checkAccessLevel(
    accessLevelToCheck: 'default' | 'admin',
    callback: (err: Error | null, res: boolean | null) => void,
  ): void
}

export type IUserModel = Model<IUser>
