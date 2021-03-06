import Mongoose, { Schema } from 'mongoose'
import { IJournal, IJournalModel } from '../interfaces/journal.interface'
import MongoosePaginate from 'mongoose-paginate-v2'

export const journalSchema: Schema = new Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },

    title: {
      type: String,
      required: true,
    },

    issn: {
      type: String,
    },

    eissn: {
      type: String,
    },

    source: {
      type: String,
      default: '',
    },

    cover: {
      type: String,
      default: '',
    },

    coverUrl: {
      type: String,
    },

    coverDate: {
      type: Date,
    },

    useGeneratedCover: {
      type: Boolean,
      default: false,
    },

    added: {
      type: Date,
    },

    latestPubdate: {
      type: Date,
    },

    views: {
      type: Number,
      default: 0,
    },

    updated: {
      type: Date,
    },

    categories: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: [],
      },
    ],
  },
  // Schema options
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
)

journalSchema.virtual('identifier').get(function (this: IJournal) {
  return this.issn ? this.issn : this.eissn ? this.eissn : ''
})

// Increment view counter
journalSchema.method('incViews', function (this: IJournal) {
  this.update({ $inc: { views: 1 } })
    .exec()
    .catch((err: Error) => {
      throw err
    })
})

journalSchema.plugin(MongoosePaginate)

export const Journal = Mongoose.model<IJournal, IJournalModel>('Journal', journalSchema)
