import { Document, Model, PaginateModel } from 'mongoose'

export interface ICategory extends Document {
  title: string
  color: string
  display: boolean // True if displayed on front page
}

export interface ICategoryModel extends Model<ICategory>, PaginateModel<ICategory> {}
