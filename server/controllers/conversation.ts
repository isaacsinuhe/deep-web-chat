import { Conversation } from '../models/conversation'
import Controller from './base';

export default class ConversationController extends Controller {
  model = Conversation

  getMessages (req, res) {
    Conversation.findOne({_id: req.query.conversationId})
    .populate([
      {
        path: 'participants',
        select: 'username email fullname'
      },
      {
        path: 'messages',
        populate: {
          path: 'owner',
          select: 'createdAt username email fullname'
        }
      },
    ])
    .then(
      conversation => {
        console.log(conversation)
        if (conversation) {
          res.status(200).json(conversation)
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
