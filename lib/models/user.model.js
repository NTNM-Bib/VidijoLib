"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const BCrypt = __importStar(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const mongoose_hidden_1 = __importDefault(require("mongoose-hidden"));
exports.userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
        validate: {
            validator: validator_1.default.isEmail,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Journal',
            default: [],
        },
    ],
    readingList: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
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
});
// Return true if app onboarding should be visible
exports.userSchema.virtual('showOnboarding').get(function () {
    return ((!this.favoriteJournals || this.favoriteJournals.length === 0) &&
        (!this.readingList || this.readingList.length === 0));
});
// Before saving a user, his password is hashed
// Add created attribute
exports.userSchema.pre('save', function (next) {
    const user = this;
    if (!user.created)
        user.created = new Date();
    if (!this.isModified('password')) {
        return next();
    }
    const saltRounds = 10;
    const plaintextPassword = user.password;
    BCrypt.hash(plaintextPassword, saltRounds, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        return next();
    });
});
// Compare the entered password in plaintext with the hash stored in the database
exports.userSchema.methods.verifyPassword = function (plaintextPassword, callback) {
    BCrypt.compare(plaintextPassword, this.password, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result);
    });
};
// Check if the user has the given access rights or higher (return true or false)
exports.userSchema.methods.checkAccessLevel = function (accessLevelToCheck, callback) {
    const user = this;
    const accessLevel = user.accessLevel;
    switch (accessLevelToCheck) {
        case 'default':
            return callback(null, accessLevel === 'default' || accessLevel === 'admin');
        case 'admin':
            return callback(null, accessLevel === 'admin');
        default:
            return callback(new Error('Unknown access level to check'), null);
    }
};
// Hide properties that should not be accessed via the API
exports.userSchema.plugin(mongoose_hidden_1.default({
    defaultHidden: {
        _id: false,
        password: true,
        passwordResetToken: true,
        passwordResetExpires: true,
    },
}));
exports.User = mongoose_1.default.model('User', exports.userSchema);
