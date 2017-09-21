import * as express from 'express'

import UserController from './controllers/user'
import UserConversationController from './controllers/user_conversation'
import ConversationController from './controllers/conversation'
import MessageController from './controllers/message'

import User from './models/user'
import * as passport from 'passport'

export default function setRoutes(app) {
  
  const api = express.Router()
  const userController = new UserController, 
  conversationController = new ConversationController,
  messageController = new MessageController,
  userConversationController = new UserConversationController

  // Auth and validators
  api.route('/login').post(userController.login)//
  api.route('/signup').post(userController.signup)//
  api.route('/user/hydrate').get(userController.hydrate)//
  api.route('/user/uniqueUsername').get(userController.uniqueUsername)//
  api.route('/user/uniqueEmail').get(userController.uniqueEmail)//
  api.route('/user/contacts').get(userController.getContacts)
  
  // UserConversation requests
  api.route('/user-conversations').get(userConversationController.getAll)
  api.route('/user-conversations/count').get(userConversationController.count)
  api.route('/user-conversation').post(userConversationController.insert)
  api.route('/user-conversation/:id').get(userConversationController.get)
  api.route('/user-conversation/:id').put(userConversationController.update)
  api.route('/user-conversation/:id').delete(userConversationController.delete)

  // Message requests
  api.route('/messages').get(messageController.getAll)//
  api.route('/messages/count').get(messageController.count)
  api.route('/message').post(messageController.insert)
  api.route('/message/:id').get(messageController.get)
  api.route('/message/:id').put(messageController.update)
  api.route('/message/:id').delete(messageController.delete)

  // Conversation requests
  api.route('/conversation/messages').get(conversationController.getMessages)//
  api.route('/conversations').get(conversationController.getAll)
  api.route('/conversations/count').get(conversationController.count)
  api.route('/conversation').post(conversationController.insert)
  api.route('/conversation/:id').get(conversationController.get)
  api.route('/conversation/:id').put(conversationController.update)
  api.route('/conversation/:id').delete(conversationController.delete)
  
  // Authenticate requests
  // api.all('/*', passport.authenticate('jwt', { session: false }))
  // Users

  api.route('/users').get(userController.getAll)
  api.route('/users/count').get(userController.count)
  api.route('/user').post(userController.insert)
  api.route('/user/:id').get(userController.get)
  api.route('/user/:id').put(userController.update)
  api.route('/user/:id').delete(userController.delete)
  
  // Apply the routes to our application with the prefix /api
  app.use('/api', api)
  
}
