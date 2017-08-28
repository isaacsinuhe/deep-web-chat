import * as bcrypt from 'bcryptjs'
import { Schema, model, Model, Document,  } from 'mongoose'
import * as passport from 'passport'

// Creation of the new User schema
const userSchema: Schema = new Schema({
  username: { type: String, unique: true, trim: true},
  fullname: String,
  contacts: [Schema.Types.ObjectId],
  conversations: [Schema.Types.ObjectId],
  notifications: [Schema.Types.ObjectId],
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

// Before saving the user, hash the password
userSchema.pre('save', function(next){
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) { return next(error) }
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err) }
    callback(null, isMatch)
  })
}

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password
    return ret
  }
})

// Interface defining user document content
export interface IUserDocument extends Document {
  username: string
  fullname: string
  email: string
  password: String
}

// Defining user methods and properties
export interface IUser extends IUserDocument {
  comparePassword(string, Function): never
}
// Defining model, its static methods, and variables
export interface IUserModel extends Model<IUser> {
  // for statick methods
}
export const User: IUserModel = model<IUser, IUserModel>('User', userSchema)

export default User
