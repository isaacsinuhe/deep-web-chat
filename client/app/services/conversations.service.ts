import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { AuthHttp } from 'angular2-jwt'
import { URLSearchParams, RequestOptions } from '@angular/http'

@Injectable()
export class ConversationsService {
  // observables for displayed conversation changes
  public currentConvoSubject
  public currentConvoChange$
  // public conversations = {}

  mockMessageList = [
    { content: 'lorem l;fal;kdfa ;kldfklj;lj ;akdj;klf ald;kl fja', owner: 'LKDJFAJ84FPOIWEJ', date: moment(), mine: false },
    { content: '7afsh7o h7u h7 hu7 fhu7as9h d', owner: 'uf7equ7', date: moment(), mine: false },
    { content: 'Jon jis ;laksj df', owner: 'Jesus', date: moment(), mine: false },
    { content: 'aaaaaaaaaaa bbbbbbbbbbbbbbbbbbb cccccccccccccccc ddddddd', owner: 'M3', date: moment(), mine: false },
  ]

  constructor(private http: AuthHttp) {
    this.currentConvoSubject = new Subject
    this.currentConvoChange$ = this.currentConvoSubject.asObservable()
  }

  getMessages (conversationId) {
    // somehow fetch messages for that convo id
    // return Observable.from(this.mockMessageList)
    const params = new URLSearchParams(`conversationId=${conversationId}`)
    const options = new RequestOptions({search: params})
    return this.http
      .get(`/api/conversation/messages`, options)
      .map(res => res.json())
      .do(messages => {
        console.log(messages)
      })
  }

  updateCurrentConversation(conversatioId) {
    this.currentConvoSubject.next()
  }

}
