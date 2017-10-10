import { Conversation } from '../models/conversation'
import { UserConversation } from '../models/user_conversation'
import { Message } from '../models/message'
import { User, IUser } from '../models/user'
import { io, chatSocket, userSocket } from '../app'
import { ObjectId } from 'mongodb'
import { Document, DocumentQuery } from 'mongoose'
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

  addGroup (req, res) {
    const {name, contacts} = req.body,
          transactions = []
    let _conversation 

    // 1.- create a new conversation and save it
    new Conversation({
      name: name,
      messages: [],
      participants: [...contacts]
    }).save()
      // 2.- insert userconversation with each userId and conversationId
      .then(conversation => {
        _conversation = conversation
        transactions.push(() => conversation.remove())

        const userConversations: Promise<Document>[] = []

        contacts.forEach(contactId => {
          userConversations.push(
            new UserConversation({
              user: contactId,
              conversation: _conversation._id,
              status: 3 // accepted conversation
            }).save())
        });
        return Promise.all(userConversations)
      })
      // 3.- Push conversation id for each participant in it
      .then(userConversations => {
        userConversations.forEach(userConversation => {
          transactions.push(() => userConversation.remove())
        });
        return true
      })
      // 4.- if all transactions succeded return true
      .catch(err => {
        this.rollBack(transactions)
        res.status(500).send({ created: false, error: err })
        return false // at least one transaction failed from execution
      })
      // finally send response through socket to the accepted user, 
      // and http to the user
      .then(succeded => {
        if (succeded) {
          console.log(_conversation);
          
          contacts.forEach(contactId => {
            userSocket.in(contactId).emit('addedToGroup', {
              conversation: _conversation,
              conversationStatus: 3
            })
          })

          res.status(200).json({
            created: true,
            conversation: _conversation,
            conversationStatus: 3
          })
        }
      })

    
    res.status(200).json({name, contacts})
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

  rollBack(transactions) {
    // console.log('rolling back');

    // tslint:disable-next-line:forin
    for (const index in transactions) {
      const transaction = transactions[index]

      transaction()
        .then(trans =>
          console.log(`Rolling back transaction ${index}/${transaction.length} rollback: ${transaction}`)
        )
        .catch(err =>
          console.log(`Error rolling the transaction ${index}/${transaction.length} ${err}`)
        )
    }
  }
}
