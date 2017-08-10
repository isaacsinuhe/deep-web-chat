import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { PARTICIPANT } from '../enums/participant'
import { CONVERSATION } from '../enums/conversation.enum'
import * as moment from 'moment'

@Injectable()
export class SessionService {
  private authenticated = false
  private picture = 'https://cdn4.iconfinder.com/data/icons/squared-line-generic-2/64/human-user-account-profile-128.png'
  private pic = '../../assets / user - account.jpg'
  private sessionState = 
  {
    user: {},
    contacts: [
      {
        name: 'Emily',
        username: 'Emily21876',
        country: 'MEX',
      },
      {
        name: 'Jon',
        username: 'klj21876',
        country: 'USA',
      },
      {
        name: 'F',
        username: 'OJSH7IACS78',
        country: 'CAN',
      },
      {
        name: '9876GYUBNI',
        username: 'KKK',
        country: 'LIB',
      },
      {
        name: 'Em',
        username: 'Em1876',
        country: 'UGA',
      },
      {
        name: '9876GYUBNI',
        username: 'KKK',
        country: 'LIB',
      },
      {
        name: 'Em',
        username: 'Em1876',
        country: 'UGA',
      },
      {
        name: '9876GYUBNI',
        username: 'KKK',
        country: 'LIB',
      },
      {
        name: 'Em',
        username: 'Em1876',
        country: 'UGA',
      },
      {
        name: 'SH',
        username: 'JFJ',
        country: 'AUS',
      }      
    ],
    conversations: new Array(10).fill(

    // [
      {
        id: 'kijhjnk',
        name: 'Viernes de Smash', 
        avatar: this.picture,
        status: CONVERSATION.FOLLOWING,
        lastMessages: [
          { content: 'lorem l;fal;kdfa ;kldfklj;lj ;akdj;klf ald;kl fja', owner: 'LKDJFAJ84FPOIWEJ', date: moment(), mine: false },
          { content: '7afsh7o h7u h7 hu7 fhu7as9h d', owner: 'uf7equ7', date: moment(), mine: false },
          { content: 'Jon jis ;laksj df', owner: 'Jesus', date: moment(), mine: false },
          { content: 'aaaaaaaaaaa bbbbbbbbbbbbbbbbbbb cccccccccccccccc ddddddd', owner: 'M3', date: moment(), mine: false },
        ],
        participants: [
          { name: 'John', avatar: this.picture, status: PARTICIPANT.ACTIVE },
          { name: 'Ava', avatar: this.picture, status: PARTICIPANT.ACTIVE},
          { name: 'Eddie', avatar: this.picture, status: PARTICIPANT.ACTIVE},
          { name: 'B', avatar: this.picture, status: PARTICIPANT.ACTIVE},
          { name: 'A', avatar: this.picture, status: PARTICIPANT.ACTIVE},
        ],
      },

    // ],
    ), 
    notifications: [],
    settings: {},
  }
  private convoObserver
  private contactObserver

  constructor() {
    this.convoObserver = Observable.from(this.sessionState.conversations)
    this.contactObserver = Observable.from(this.sessionState.contacts)
  }

  get(prop) {
    return this.authenticated ?
      this.sessionState[prop] :
      null
  }
  getConversations () {
    return this.convoObserver
  }
  getContacts () {
    return this.contactObserver
  }
  setAuth (val) {
    this.authenticated = val
    return val
  }
}
