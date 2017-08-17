import * as express from 'express'

import UserController from './controllers/user'
import User from './models/user'

export default function setRoutes(app) {

  const router = express.Router()

  const userController = new UserController()


  // Users
  router.route('/login').post(userController.login)
  router.route('/user/uniqueUsername').get(userController.uniqueUsername)
  router.route('/user/uniqueEmail').get(userController.uniqueEmail)

  router.route('/users').get(userController.getAll)
  router.route('/users/count').get(userController.count)

  // Crud inherited from BaseController
  router.route('/user').post(userController.insert)
  router.route('/user/:id').get(userController.get)
  router.route('/user/:id').put(userController.update)
  router.route('/user/:id').delete(userController.delete)
  
  // Apply the routes to our application with the prefix /api
  app.use('/api', router)
  
}
