import * as express from 'express'

import UserController from './controllers/user'
import User from './models/user'
import * as passport from 'passport'

export default function setRoutes(app) {
  
  const api = express.Router()
  const userController = new UserController()

  // Auth and validators
  api.route('/login').post(userController.login)
  api.route('/signup').post(userController.signup)
  api.route('/user/uniqueUsername').get(userController.uniqueUsername)
  api.route('/user/uniqueEmail').get(userController.uniqueEmail)
  
  // Authenticate requests
  api.all('/*', passport.authenticate('jwt', { session: false }))
  
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
