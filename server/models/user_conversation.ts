import { Schema, model } from 'mongoose';
import { Message } from './message'
const { Types: ObjectId } = Schema

const UserConversationSchema = new Schema({
    user: { type: ObjectId, ref: 'User'},
    conversation: { type: ObjectId, ref: 'Conversation'},
    status: Number
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
})

export const UserConversation = model('UserConversation', UserConversationSchema)

export default UserConversation;
