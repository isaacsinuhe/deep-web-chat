import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { AuthHttp } from 'angular2-jwt'
import { SessionService } from '../services/session.service'
import { URLSearchParams, RequestOptions } from '@angular/http'

@Injectable()
export class ConversationsService {
  // observables for displayed conversation changes
  public currentConvoSubject
  public currentConvoChange$
  public currentConvoId

  public incomingMessageSubject
  public incomingMessageChange$
  public incomingMessageId

  constructor(private http: AuthHttp, private session: SessionService) {
    this.currentConvoSubject = new Subject
    this.currentConvoChange$ = this.currentConvoSubject.asObservable()

    this.incomingMessageSubject = new Subject
    this.incomingMessageChange$ = this.incomingMessageSubject.asObservable()
  }

  getMessages (conversationId) {
    const params = new URLSearchParams(`conversationId=${conversationId}`)
    const options = new RequestOptions({search: params})

    return this.http
      .get(`/api/conversation/messages`, options)
      .map(res => res.json())
  }

  addMessage (msg) {
    msg.owner = this.session.sessionId
    this.http.post('/api/message', msg)
      .do(msg => console.log('message from conversation service:addMessage()', msg))
      .subscribe(message => this.incomingMessageSubject.next(message))
  }

  changeConversation (conversationId) {
    this.currentConvoId = conversationId
    this.getMessages(conversationId)
      .subscribe( messages => this.currentConvoSubject.next(messages))
  }

}
