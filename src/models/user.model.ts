import Mongoose, { HookNextFunction, Schema } from 'mongoose'
import * as BCrypt from 'bcrypt'
import Validator from 'validator'
import MongooseHidden from 'mongoose-hidden'
import MongoosePaginate from 'mongoose-paginate-v2'
import { IUser, IUserModel } from '../interfaces/user.interface'

export const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required'],
      validate: {
        validator: Validator.isEmail,
        msg: 'Username must be a valid email address',
      },
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [10, 'Password is too short'],
      maxlength: [128, 'Password is too long'],
    },

    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [1, 'First name is too short'],
      maxlength: [128, 'First name is too long'],
    },

    secondName: {
      type: String,
      minlength: [1, 'Last name is too short'],
      maxlength: [128, 'Last name is too long'],
    },

    // Auth, ...
    isVerified: {
      type: Boolean,
      default: false,
    },

    passwordResetToken: {
      type: String,
    },

    passwordResetExpires: {
      type: Date,
    },

    accessLevel: {
      type: String,
      enum: ['default', 'admin'],
      default: 'default',
    },

    lastActivity: {
      type: Date,
    },

    created: {
      type: Date,
    },

    // Content
    favoriteJournals: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Journal',
        default: [],
      },
    ],

    readingList: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Article',
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

// Return true if app onboarding should be visible
userSchema.virtual('showOnboarding').get(function (this: IUser) {
  return (
    (!this.favoriteJournals || this.favoriteJournals.length === 0) &&
    (!this.readingList || this.readingList.length === 0)
  )
})

// Before saving a user, his password is hashed
// Add created attribute
userSchema.pre('save', function (next: HookNextFunction) {
  const user: IUser = this as IUser

  if (!user.created) user.created = new Date()

  if (!this.isModified('password')) {
    return next()
  }

  const saltRounds = 10
  const plaintextPassword: string = user.password

  BCrypt.hash(plaintextPassword, saltRounds, (err: Error, hash: string) => {
    if (err) {
      return next(err)
    }

    user.password = hash
    return next()
  })
})

// Compare the entered password in plaintext with the hash stored in the database
userSchema.methods.verifyPassword = function (
  this: IUser,
  plaintextPassword: string,
  callback: (err: Error | null, res: boolean | null) => void,
) {
  BCrypt.compare(plaintextPassword, this.password, (err, result) => {
    if (err) {
      return callback(err, null)
    }

    return callback(null, result)
  })
}

// Check if the user has the given access rights or higher (return true or false)
userSchema.methods.checkAccessLevel = function (
  this: IUser,
  accessLevelToCheck: 'default' | 'admin',
  callback: (err: Error | null, res: boolean | null) => void,
) {
  const user: IUser = this as IUser
  const accessLevel = user.accessLevel

  switch (accessLevelToCheck) {
    case 'default':
      return callback(null, accessLevel === 'default' || accessLevel === 'admin')

    case 'admin':
      return callback(null, accessLevel === 'admin')

    default:
      return callback(new Error('Unknown access level to check'), null)
  }
}

// Hide properties that should not be accessed via the API
userSchema.plugin(
  MongooseHidden({
    defaultHidden: {
      _id: false,
      password: true,
      passwordResetToken: true,
      passwordResetExpires: true,
    },
  }),
)

userSchema.plugin(MongoosePaginate)

export const User = Mongoose.model<IUser, IUserModel>('User', userSchema)
