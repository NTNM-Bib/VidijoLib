import Mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { ICategory } from '../interfaces/category.interface'

export const categorySchema: Schema = new Schema({
  title: {
    type: String,
    minlength: [3, 'Category.title must be at least 3 characters long'],
    required: [true, 'Category.title is required'],
    unique: [true, 'Category with this title already exists'],
  },

  color: {
    type: String,
    default: '#0099ff',
  },

  display: {
    type: Boolean,
    default: false,
  },
})

export const Category = Mongoose.model<ICategory>('Category', categorySchema)
