import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/scan'
import { AuthHttp } from 'angular2-jwt'
import { Conversations, Conversation, Message, Owner } from '../models/conversations'
import { SessionService } from '../services/session.service'
import { URLSearchParams, RequestOptions } from '@angular/http'

@Injectable()
export class ConversationsService {
  // observables for displayed conversation changes
  public currentConvoSubject
  public currentConvoChange$
  public currentConvoId = null
  public currentConvo: Conversation

  public previousMessagesSubject
  public previousMessagesChange$
  private requesting = false

  public incomingMessageSubject
  public incomingMessageChange$
  public incomingMessageId
  
  public Conversations: Conversations

  constructor(private http: AuthHttp, private session: SessionService) {
    this.currentConvoSubject = new Subject
    this.currentConvoChange$ = this.currentConvoSubject.asObservable()

    // this.incomingMessageSubject = new Subject
    // this.incomingMessageChange$ = this.incomingMessageSubject.asObservable()

    // this.previousMessagesSubject = new Subject
    // this.previousMessagesChange$ = this.previousMessagesSubject.asObservable()
  }

  hydrateConversations (data) {
    this.Conversations = Conversations.createFromInitState(data)
  }

  getConversationsList () {
    return Observable.of(this.Conversations.getAll())
  }

  getMessages (conversationId) {
    return Observable.of(this.Conversations.getMessages(conversationId))
  }

  getPreviousMessages () {
    if ( this.currentConvo.noMoreMessages || this.requesting) { return 0 }
    this.requesting = true

    const firstMessage = this.currentConvo.getFirstMessage() || {_id: null}

    const params = new URLSearchParams()
    params.set('conversationId', this.currentConvoId)    
    
    params.set('messageId', firstMessage._id)

    const options = new RequestOptions({search: params})
    
    this.http
      .get(`/api/conversation/messages`, options)
      .map(res => res.json())
      .subscribe( messages => {
        if (messages.length < 10) this.currentConvo.noMoreMessages = true
        messages.forEach(message => {
          this.prependMessage(new Message(message))
        });
        this.requesting = false
      }
    )
  }
    
  prependMessage (message) {
    this.currentConvo.messages.unshift(message)
    // this.previousMessagesSubject.next(message)
    return message
  }
  
  addMessage (msg) {
    if (!this.currentConvoId) { return }
    
    msg.owner = this.session.sessionId
    this.http.post('/api/conversation/message', 
    {
      conversationId: this.currentConvoId,
      message: msg
    })
    .map(message => new Message(message.json()))
    .subscribe(message => {
      // console.log(message)
      // this.currentConvo.messages.push(message)
    })
  }
  
  appendMessage (message, convoId) {
    console.log(message, convoId)
    this.Conversations.findById(convoId).pushMessage(message)
    // this.session.updateLastMessage(message, convoId)
  }

  changeConversation (conversationId) {
    this.currentConvoId = conversationId
    this.currentConvo = this.Conversations.findById(conversationId)
    this.currentConvoSubject.next(this.currentConvo)
  }

}
