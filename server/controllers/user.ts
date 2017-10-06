import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { io, userSocket } from '../app'

import { User, IUser, IUserModel} from '../models/user';
import { UserConversation } from '../models/user_conversation'
import { Conversation } from '../models/conversation'
import Controller from './base';

export default class UserController extends Controller {
  model = User

  login (req, res) {
    User.findOne({ username: req.body.username })
      // .populate([
      //   { path: 'contacts', select: '_id fullname username ' },
      // ])
      .exec((err, user) => {
        if (err) res.sendStatus(500)
        
        if (!user) { return res.sendStatus(403) }
        user.comparePassword(req.body.password, (error, isMatch) => {
          if (!isMatch) { return res.sendStatus(403) }
          const id_token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, { expiresIn: '2000d' }) 
          res.status(200).json({id_token})       
        })
      })
  }

  signup (req, res) {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        console.log('error at finding user', err);
        res.sendStatus(403)
      } 
      if (user) { 
        console.log('user already in db', err);
        res.sendStatus(400)
      } else {
        user = new User(req.body)
        user.save((e, usr) => {
          if (!e) {
            try {
              const id_token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, { expiresIn: '2d' })
              res.status(200).json({ id_token })
            } catch (e){
              user.remove()
              console.log('error trying to send token', e)
              res.sendStatus(400)
            }
          }
          if (e && e.code === 11000) {
            res.sendStatus(400)
            console.error('error saving the user at signup, duplicated user', e)
          }
          if (e) {
            res.sendStatus(403)
            console.error('error saving the user at signup', e)
          }
        })
      }
    });
  }

  hydrate (req, res) {
    // console.log('request _id', req.query.userId)
    // if (!req.query._id) res.sendStatus(400)
    User.findOne({_id: req.query.userId})
      .populate({
        path: 'contacts.contact',
        select: 'username fullname email'
      })
      .then((user) => {
        user.hydrate()
        .exec((err2, conversations) => {
          if (err2) res.sendStatus(500)
          res.status(200).json({user, conversations})
        })
      })
      .catch((err) => {
        res.sendStatus(500)
      })
  }

  uniqueUsername (req, res) {
    User.findOne({username: req.query.username}, (err, user) => {
      if (err) res.sendStatus (404)
      res.send({repeated: user ? true : null})
    })
  }
  
  uniqueEmail (req, res) {
    User.findOne({email: req.query.email}, (err, user) => {
      if (err) res.sendStatus (404)
      res.send({repeated: user ? true : null})
    })
  }

  addContact (req, res) {
    const userId = req.body.userId,
          contactId = req.body.contactId,
          transactions = []
    let _conversation, _user, _contact = null

    // 1.- create a new conversation and save it
    new Conversation({
      name: '',
      messages: [],
      participants: [userId, contactId]
    }).save()

    // 2.- insert userconversation with userId and conversationId
    .then( conversation => {
      _conversation = conversation
      transactions.push(() => {conversation.remove()})
      return new UserConversation({
        user: userId,
        conversation: conversation._id,
        status: 1 // pending of acceptance conversation
      }).save()
    })
    
    // 3.- update currentUser pushing added contactId as requesting user (status 0)
    .then( userConversation => {
      transactions.push(() => { userConversation.remove() })
      return User.findByIdAndUpdate(userId, {
        $push: {
          'contacts': {
            contact: contactId,
            status: 0
          }
        }
      })
      
    })

    // 4.- update the target/contact user pushing userId as pending user (status 2)
    .then( user => {
      _user = user
      transactions.push(() => { 
        user.update({ $pull: {'contacts.contact': contactId }})
      })
      return User.findByIdAndUpdate(contactId, {
        $push: {
          'contacts': {
            contact: userId,
            status: 2
          }
        }
      })
    })
    .then( contact => {
      _contact = contact
      transactions.push(() => {
        contact.update({ 
          $pull: { 'contacts.contact': contactId } })
      })
      return true // all transaction was succesfully executed
    })
    
    .catch(err => {
      this.rollBack(transactions)
      res.status(500).send({added: false, error: err})
      return false // at least one transaction failed from execution
    })
    // 5.- if all transactions succeded then 
    //  a.- respond the client/user with the conversation&contact info through http
    //  b.- emit to the contact with conversation&user info through userSocket on room contactId

    .then(succeded => {
      if (succeded) {
        userSocket.in(contactId).emit('contactRequest', {
          conversation: _conversation,
          contact: _user,
          contactStatus: 2
        })
        res.status(200).json({
          added: true,
          conversation: _conversation,
          conversationStatus: 1,
          contact: _contact,
          contactStatus: 0
        })
      }
    })
  }

  acceptContact (req, res) {
    let _user, _accepted
    const transactions = [], 
      { acceptId, userId } = req.body

    // 1.- find user and change contact/acceptedid status
    User.findByIdAndUpdate(userId, {
      $push: {
        'contacts': {
          contact: acceptId,
          status: 0
        }
      }
    })
    // 2.- find accepted user and change contact/userid status
    .then(user => {
      _user = user
      transactions.push(() => {})
      User.findByIdAndUpdate(acceptId, {
        $push: {
          'contacts': {
            contact: acceptId,
            status: 0
          }
        }
      })
    })
    .then(accepted => {
      transactions.push(() => {})
      _accepted = accepted
    })
    .catch(err => {
      this.rollBack(transactions)
      res.status(500).send({ added: false, error: err })
      return false // at least one transaction failed from execution
    })
    // finally send response through socket to the accepted user, 
    // and http to the user
    .then(succeded => {
      if (succeded) {
        userSocket.in(acceptId).emit('requestAccepted', {
          conversation: _conversation,
          contact: _user,
          contactStatus: 2
        })
        res.status(200).json({
          added: true,
          conversation: _conversation,
          conversationStatus: 1,
          contact: _accepted,
          contactStatus: 0
        })
      }
    })
  }

  removeContact () {

  }

  ignoreContact () {

  }

  searchContacts (req, res) {
    const criteria = req.query.criteria
    const currentContacts = req.query.currentContacts.split(',')
    let search = ''
    
    for (const key in currentContacts) {
      if (currentContacts.hasOwnProperty(key)) {
        const element = currentContacts[key];
        if (element === '')  currentContacts.splice(key, 1)
      }
    }
    console.log(currentContacts);
    

    for (const letter in criteria) {
      if (criteria.hasOwnProperty(letter)) {
        const element = criteria[letter];
        search += element + '.*'
      }
    }
    
    User.find({
        _id: {$nin: currentContacts}
      })
      .where({
        username: new RegExp(search, 'gi')
        // username: new RegExp('^' + search, 'gi')
      })
      .select('username fullname email')
      .limit(10)
      .then( users => {
        console.log(users);
        
        res.status(200).send(users)
      })
      .catch(err => {
        console.log('failed at user/contacts/search', err)
      })

  }

  getContacts (req, res) {
    const id = req.query.userId
    
    User.findById(id)
      .populate({
        path: 'contacts.contact',
        select: 'username email fullname'
      })
      .select('contacts')
      .then(
        (result: any) => {
          // console.log('blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', result, id)
          const response: [{_id?, username?, email?, fullname?, status?}] | any = []

          result.contacts.forEach((contact: any, index) => {
            response.push({
              _id: contact.contact._id,
              username: contact.contact.username,
              email: contact.contact.email,
              fullname: contact.contact.fullname,
              status: contact.status
            })
          })

          res.status(200).json(response) 
          // console.log(result, 'result from user/contacts')
        },
        err => res.sendStatus(400)
      )
  }

  rollBack (transactions) {
    // tslint:disable-next-line:forin
    for (const index in transactions) {
      const transaction = transactions[index]

      transaction()
        .then(trans => 
          console.log(`Rolling back transaction ${index}/${transaction.length} ${transaction}`)
        )
        .catch( err =>
          console.log(`Error rolling the transaction ${index}/${transaction.length} ${err}`)
        )
    }
  }
}
