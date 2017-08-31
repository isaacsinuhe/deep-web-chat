import * as bcrypt from 'bcryptjs'
import { Schema, model, Model, Document, } from 'mongoose'
import * as passport from 'passport'
const { ObjectId } = Schema.Types

// Creation of the new User schema
export const NotificationSchema= new Schema({
        senderId: { type: ObjectId, ref: 'User'},
        type: Number,
        content: String,
        date: Date
    })
