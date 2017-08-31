import * as bcrypt from 'bcryptjs'
import { Schema, model, Model, Document,  } from 'mongoose'
import * as passport from 'passport'
import { NotificationSchema } from './notification'
import { SettingsSchema } from './settings'
import { UserConversation } from './user_conversation'
const { ObjectId } = Schema.Types


// Creation of the new User schema
const UserSchema: Schema = new Schema({
  username: { type: String, unique: true, trim: true},
  fullname: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  contacts: [{ type: ObjectId, ref: 'User'}],
  notifications: [ NotificationSchema ],
  settings: SettingsSchema
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

// Before saving the user, hash the password
UserSchema.pre('save', function(next){
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

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err) }
    callback(null, isMatch)
  })
}
UserSchema.methods.hydrate = function() {
  return UserConversation.find({ user: this.id })
    .select('_id conversation status')
    .populate([
      {
        path: 'conversation',
        select: 'name avatar messages updatedAt createdAt',
        populate: {
          path: 'messages',
          options: {
            limit: 1,
            sort: { createdAt: -1 }
          }
        }
      }
    ])
}

// Omit the password when returning a user
UserSchema.set('toJSON', {
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
  hydrate(): any
}
// Defining model, its static methods, and variables
export interface IUserModel extends Model<IUser> {
  // for statick methods
}
export const User: IUserModel = model<IUser, IUserModel>('User', UserSchema)

export default User
