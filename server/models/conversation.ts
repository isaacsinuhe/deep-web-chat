import { Schema, model} from 'mongoose';
import Message from './message'
const { Types: ObjectId } = Schema


const conversationSchema = new Schema({
  name: String,
  avatar: String,
  messages: [ ObjectId ],
  participants: [ ObjectId ]
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const Conversation = model('Conversation', conversationSchema)

export default Conversation;
