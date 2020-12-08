import { Document, Model, Types } from 'mongoose'
import { IUser } from './user.interface'

export interface IToken extends Document {
  user: IUser | string | Types.ObjectId
  token: string
  created: Date
  isVerified: boolean
}

export type ITokenModel = Model<IToken>
