import { Schema, model, SchemaOptions } from 'mongoose'

const messageSchema = new Schema({
  content: String,
  ownerId: Schema.Types.ObjectId
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
const Message = model('Message', messageSchema)

export default Message;
