import { Schema, model, SchemaOptions } from 'mongoose'
const { ObjectId } = Schema.Types

const MessageSchema = new Schema({
  content: String,
  owner: {type: ObjectId, ref: 'User'}
}, { timestamps: { createdAt: 'createdAt' } })

export const Message = model('Message', MessageSchema)

export default Message
