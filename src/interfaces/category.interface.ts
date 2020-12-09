import { Document, Model } from 'mongoose'

export interface ICategory extends Document {
  title: string
  color: string
  display: boolean // True if displayed on front page
}

export type ICategoryModel = Model<ICategory>
