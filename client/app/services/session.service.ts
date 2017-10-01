import { Injectable } from '@angular/core';
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
import { SocketService } from './socket.service'

@Injectable()
export class SessionService {
  private sessionState
  
  // observables for session changes
  public sessionSubject
  public sessionChanges$

  private jwt = new JwtHelper

  constructor(private router: Router, private http: AuthHttp) {
    // initialization of subjects and observables
    this.sessionSubject = new ReplaySubject(1)
    this.sessionChanges$ = this.sessionSubject.asObservable()
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

  updateLastMessage (message, convoId) {
    // console.log(this.sessionState, message)
    this.sessionState.conversations.forEach(({conversation}) => {
      if (conversation._id === convoId)
        conversation.messages = [message]
    });
  }

  notifySessionChange (change) {
    this.sessionSubject.next(change)
    return change
  }

  get loggedIn () {
    const token = localStorage.getItem('id_token')
       , expired = !!token && this.jwt.isTokenExpired(token)
       
    return !!token && !expired
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
