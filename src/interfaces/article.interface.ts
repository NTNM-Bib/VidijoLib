import { Document, Model, PaginateModel, Types } from 'mongoose'
import { IJournal } from './journal.interface'

export interface IArticle extends Document {
  doi: string
  publishedIn: Types.ObjectId | string | IJournal
  title: string
  authors: string[]
  abstract: string
  source: string // Virtual: https://doi.org/{{this.doi}}
  pubdate: Date
}

export interface IArticleModel extends Model<IArticle>, PaginateModel<IArticle> {}
