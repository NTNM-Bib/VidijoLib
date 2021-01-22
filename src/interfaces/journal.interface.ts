import { Document, Model, Types, PaginateModel } from 'mongoose'
import { ICategory } from './category.interface'

interface IJournalDocument extends Document {
  active: boolean
  title: string
  issn: string
  eissn: string
  source: string
  cover: string
  coverUrl: string
  coverDate: Date
  useGeneratedCover: boolean
  added: Date
  latestPubdate: Date
  views: number
  updated: Date
  categories: string[] | Types.ObjectId[] | ICategory[]
  identifier: string // Virtual: returns issn or eissn
}

export interface IJournal extends IJournalDocument {
  incViews(): void
}

export interface IJournalModel extends Model<IJournal>, PaginateModel<IJournal> {}
