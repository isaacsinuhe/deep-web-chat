import * as bcrypt from 'bcryptjs'
import { Schema, model, Model, Document, } from 'mongoose'
import * as passport from 'passport'
const { ObjectId } = Schema.Types

// Creation of the new User schema
export const SettingsSchema = new Schema({
    language: String
}, { _id: false })
