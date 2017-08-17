import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import Controller from './base';

export default class UserController extends Controller {
  model = User;

  login = (req, res) => {
    this.model.findOne({ username: req.body.username }, (err, user) => {
      if (!user) { return res.sendStatus(403) }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403) }
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN) // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token })
      });
    });
  }

  uniqueUsername = (req, res) => {
    
    this.model.findOne({username: req.query.username}, (err, user) => {
      if (err) res.send ({repeated: true})
      return user ? res.send({repeated: true}) : null
    })
  }

  uniqueEmail = (req, res) => {
    
    this.model.findOne({email: req.query.email}, (err, user) => {
      if (err) res.send ({repeated: true})
      return user ? res.send({repeated: true}) : null
    })
  }

}
