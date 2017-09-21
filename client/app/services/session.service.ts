import { Injectable, OnInit, DoCheck } from '@angular/core';
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { AsyncSubject } from 'rxjs/AsyncSubject'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { Observable } from 'rxjs/Observable'
import { PARTICIPANT } from '../enums/participant'
import { CONVERSATION } from '../enums/conversation.enum'
import { NOTIFICATION } from '../enums/notification.enum'
import { tokenNotExpired, JwtHelper, AuthHttp } from 'angular2-jwt'
import { Router } from '@angular/router'
import { RequestOptions, URLSearchParams } from '@angular/http'
import * as moment from 'moment'

@Injectable()
export class SessionService implements OnInit{
  
  private picture = 'https://cdn4.iconfinder.com/data/icons/squared-line-generic-2/64/human-user-account-profile-128.png' 
  
  private sessionState
  
  // observables for session changes
  public sessionSubject
  public sessionChanges$
  


  private convoObserver
  private contactObserver
  private notificationObserver
  private pic = '../../assets / user - account.jpg'
  private jwt = new JwtHelper

  constructor(private router: Router, private http: AuthHttp) {
    // initialization of subjects and observables
    this.sessionSubject = new ReplaySubject(1)
    this.sessionChanges$ = this.sessionSubject.asObservable()

    // this.convoObserver = Observable.from(this.sessionState.conversations)
    // this.contactObserver = Observable.from(this.sessionState.user.contacts)
    // this.notificationObserver = Observable.from(this.sessionState.user.notifications)
  }

  ngOnInit () {

  }

  initSessionState () {
    const params = new URLSearchParams(`userId=${this.sessionId}`)
    const reqOpts = new RequestOptions({search: params})
    
    return this.http
      .get(`/api/user/hydrate`, reqOpts)
      .map(res => res.json())
      .do( session => {
        this.sessionState = session
        this.notifySessionChange(session)
      })
  }

  notifySessionChange (change) {
    this.sessionSubject.next(change)
    return change
  }

  // getConversations () {
  //   return this.convoObserver
  // }
  // getContacts () {
  //   return this.contactObserver
  // }
  // getNotifications () {
  //   return this.notificationObserver
  // }

  get loggedIn () {
    const token = localStorage.getItem('id_token'),
          expired = !tokenNotExpired()
    
    return token && !expired
  }
  get sessionId () {
    const token = localStorage.getItem('id_token')
    return token && this.jwt.decodeToken(token)._id
  }
  
  logOut () {
    localStorage.removeItem('id_token')
    this.router.navigate(['home'])
  }
}

// export class SessionService {
//   private authenticated = false
//   private picture = 'https://cdn4.iconfinder.com/data/icons/squared-line-generic-2/64/human-user-account-profile-128.png'
//   private pic = '../../assets / user - account.jpg'
//   private sessionState = 
//   {
//     user: {},
//     contacts: [
//       {
//         name: 'Emily',
//         username: 'Emily21876',
//         country: 'MEX',
//       },
//       {
//         name: 'Jon',
//         username: 'klj21876',
//         country: 'USA',
//       },
//       {
//         name: 'F',
//         username: 'OJSH7IACS78',
//         country: 'CAN',
//       },
//       {
//         name: '9876GYUBNI',
//         username: 'KKK',
//         country: 'LIB',
//       },
//       {
//         name: 'Em',
//         username: 'Em1876',
//         country: 'UGA',
//       },
//       {
//         name: '9876GYUBNI',
//         username: 'KKK',
//         country: 'LIB',
//       },
//       {
//         name: 'Em',
//         username: 'Em1876',
//         country: 'UGA',
//       },
//       {
//         name: '9876GYUBNI',
//         username: 'KKK',
//         country: 'LIB',
//       },
//       {
//         name: 'Em',
//         username: 'Em1876',
//         country: 'UGA',
//       },
//       {
//         name: 'SH',
//         username: 'JFJ',
//         country: 'AUS',
//       }      
//     ],
//     conversations: new Array(10).fill(

//     // [
//       {
//         id: 'kijhjnk',
//         name: 'Viernes de Smash', 
//         avatar: this.picture,
//         status: CONVERSATION.FOLLOWING,
//         lastMessages: [
//           { content: 'lorem l;fal;kdfa ;kldfklj;lj ;akdj;klf ald;kl fja', owner: 'LKDJFAJ84FPOIWEJ', date: moment(), mine: false },
//           { content: '7afsh7o h7u h7 hu7 fhu7as9h d', owner: 'uf7equ7', date: moment(), mine: false },
//           { content: 'Jon jis ;laksj df', owner: 'Jesus', date: moment(), mine: false },
//           { content: 'aaaaaaaaaaa bbbbbbbbbbbbbbbbbbb cccccccccccccccc ddddddd', owner: 'M3', date: moment(), mine: false },
//         ],
//         participants: [
//           { name: 'John', avatar: this.picture, status: PARTICIPANT.ACTIVE },
//           { name: 'Ava', avatar: this.picture, status: PARTICIPANT.ACTIVE},
//           { name: 'Eddie', avatar: this.picture, status: PARTICIPANT.ACTIVE},
//           { name: 'B', avatar: this.picture, status: PARTICIPANT.ACTIVE},
//           { name: 'A', avatar: this.picture, status: PARTICIPANT.ACTIVE},
//         ],
//       },

//     // ],
//     ), 
//     notifications: [
//       {
//         id: 'dfj;adkjf', senderId: 'fadfa',
//         senderName: 'fda', title: 'you are gonna die',
//         type: NOTIFICATION.INVITATION, 
//         content: ';bbbbbbbbbbbbbbbbbddddddddddddddddddddddddddddddddddddddddbbbvvvvvvvvvvv',
//         date: moment()
//       },
//       {
//         id: 'dfj;adkjf', senderId: 'fadfa',
//         senderName: 'fda', title: 'Good news',
//         type: NOTIFICATION.INVITATION, 
//         content: 'you have an invitation to join the group "SFSD;FKA SLDKF"',
//         date: moment()
//       },
//       {
//         id: 'dfj;adkjf', senderId: 'fadfa',
//         senderName: 'fda', title: 'Good news',
//         type: NOTIFICATION.INVITATION, 
//         content: 'You forgot tu git push your commits :O',
//         date: moment()
//       },
//       {
//         id: 'dfj;adkjf', senderId: 'fadfa',
//         senderName: 'fda', title: 'Good news',
//         type: NOTIFICATION.INVITATION, 
//         content: 'You forgot tu git push your commits :O',
//         date: moment()
//       },
//       {
//         id: 'dfj;adkjf', senderId: 'fadfa',
//         senderName: 'fda', title: 'Good news',
//         type: NOTIFICATION.INVITATION, 
//         content: 'You forgot tu git push your commits :O',
//         date: moment()
//       },
//       {
//         id: 'dfj;adkjf', senderId: 'fadfa',
//         senderName: 'fda', title: 'Good news',
//         type: NOTIFICATION.INVITATION, 
//         content: 'You forgot tu git push your commits :O',
//         date: moment()
//       },
//       {
//         id: 'dfj;adkjf', senderId: 'fadfa',
//         senderName: 'fda', title: 'Good news',
//         type: NOTIFICATION.INVITATION, 
//         content: 'You forgot tu git push your commits :O',
//         date: moment()
//       },
//     ],
//     settings: {},
//   }
//   private convoObserver
//   private contactObserver
//   private notificationObserver

//   constructor() {
//     this.convoObserver = Observable.from(this.sessionState.conversations)
//     this.contactObserver = Observable.from(this.sessionState.contacts)
//     this.notificationObserver = Observable.from(this.sessionState.notifications)
//   }

//   get(prop) {
//     return this.authenticated ?
//       this.sessionState[prop] :
//       null
//   }
//   getConversations () {
//     return this.convoObserver
//   }
//   getContacts () {
//     return this.contactObserver
//   }
//   getNotifications () {
//     return this.notificationObserver
//   }
//   setAuth (val) {
//     this.authenticated = val
//     return val
//   }
// }
