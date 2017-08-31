import { Schema, model} from 'mongoose';
import { Message } from './message'
const { ObjectId } = Schema.Types

const ConversationSchema = new Schema({
  name: String,
  avatar: String,
  messages: [{ type: ObjectId, ref: 'Message' }],
  participants: [{ type: ObjectId, ref: 'User'}]
},
  {
  // toJSON: {
  //   virtuals: true
  // }, 
  // toObject: {
  //   virtuals: true
  // },
  timestamps: { 
    createdAt: 'createdAt', 
    updatedAt: 'updatedAt' 
  } 
})

ConversationSchema.virtual('lastMessage').get(function () {
  return this.messages[this.messages.length - 1]
})

export const Conversation = model('Conversation', ConversationSchema)

export default Conversation;
