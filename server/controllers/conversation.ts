import { Conversation } from '../models/conversation'
import { Message } from '../models/message'
import { User } from '../models/user'
import { io, chatSocket } from '../app'
import { ObjectId } from 'mongodb'
import Controller from './base';

export default class ConversationController extends Controller {
  model = Conversation

  insertMessage (req, res) {
    const msg: any = new Message(req.body.message),
      owner = req.body.message.owner,
      conversationId = req.body.conversationId
    let retMsg = null

    msg.save()
    .then(message => 
      User.findById(owner)
        .select('createdAt username email fullname')
    )
    .then(user => (msg.owner = user, msg))
    .then(message => {
      // console.log(message, 'from insertmessage in conversation')
      retMsg = message
      Conversation.findByIdAndUpdate(
        conversationId,
        { $push: {'messages':  message._id }},
        { upsert: false, new: true },
        (err, conversation) => {
          if (err) res.sendStatus(404)

          console.log('emitting from db to room ' + conversationId)
          chatSocket.in(conversationId).emit('addConversationMessage', {
            message: retMsg,
            conversationId
          })
          res.status(200).json(retMsg)
        }
      )
    })
    .catch(e => console.log('conversation not saved', e))
  }

  getPreviousMessages (req, res) {
    const messageId = new ObjectId(req.query.messageId),
        conversationid = new ObjectId(req.query.conversationId)
    console.log(messageId.getTimestamp());
    
    Conversation.findOne({_id: conversationid})
    .populate([
      {
        path: 'participants',
        select: 'username email fullname'
      },
      {
        path: 'messages',
        populate: {
          path: 'owner',
          select: 'username email fullname',
        },
        options: {
          sort: { createdAt: -1 },
          where: { 'createdAt': { $lt: messageId.getTimestamp()}},
          limit: 10
        }
      },
    ])
    .then(
      (conversation: any) => {
        // console.log(conversation)
        if (conversation) {
          res.status(200).json(conversation.messages)
        } else {
          res.sendStatus(404)
        }
      },
      err => { 
        console.log(err, 'error in conversation/messages/:id')
        res.sendStatus(400)
      }
    )
  }
}
