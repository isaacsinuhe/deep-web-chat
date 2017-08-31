import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import { User, IUser, IUserModel} from '../models/user';
import { UserConversation } from '../models/user_conversation'
import Controller from './base';

export default class UserController extends Controller {
  model = User

  login = (req, res) => {
    User.findOne({ username: req.body.username })
      // .populate([
      //   { path: 'contacts', select: '_id fullname username ' },
      // ])
      .exec((err, user) => {
        if (err) res.sendStatus(500)
        
        if (!user) { return res.sendStatus(403) }
        user.comparePassword(req.body.password, (error, isMatch) => {
          if (!isMatch) { return res.sendStatus(403) }
          const id_token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, { expiresIn: '2d' }) 
          res.status(200).json({id_token})
          // , { expiresIn: 10 } seconds          
        })
      })
  }

  signup = (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        res.sendStatus(403)
      } else if (!user) {
        user = new User(req.body)
        user.save((e, usr) => {
          if (e && e.code === 11000) {
            res.sendStatus(400)
          }
          if (e) {
            res.sendStatus(403)
            return console.error(e)
          }
          if (!e) {
            this.login(req, res)
          }
        })
  
      }
    });
  }

  hydrate (req, res) {
    User.findOne(req.query._id)
      .exec((err, user) => {
        user.hydrate().exec((err2, conversations) => {
          if (err2) res.sendStatus(500)
          res.status(200).json({
            user,
            conversations
          })
        })
      })
  }

  uniqueUsername = (req, res) => {
    User.findOne({username: req.query.username}, (err, user) => {
      if (err) res.sendStatus (404)
      res.send({repeated: user ? true : null})
    })
  }
  
  uniqueEmail = (req, res) => {
    User.findOne({email: req.query.email}, (err, user) => {
      if (err) res.sendStatus (404)
      res.send({repeated: user ? true : null})
    })
  }

}
