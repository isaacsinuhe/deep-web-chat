import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'
import { Message } from '../models/conversations'
import { ConversationsService } from './conversations.service'
import { SessionService } from './session.service'
import { ContactsService } from './contacts.service'
import * as io from 'socket.io-client'

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000';
  private defaultSocket
  public chatSocket
  public userSocket

  constructor(
    private session: SessionService,
    private conversations: ConversationsService,
    private contacts: ContactsService
  ) {
    // default namespace
    this.defaultSocket = io(this.url)
    this.defaultSocket.on('msg', this.msgHandler)

    // chat namespace 
    this.chatSocket = io(this.url + '/chat')
    this.chatSocket.on('msg', this.msgHandler)  
    this.chatSocket.on('addConversationMessage', this.addConversationMessage)

    // user namespace
    this.userSocket = io(this.url + '/user')
    this.joinMyRoom()
    this.userSocket.on('msg', this.msgHandler)
    this.userSocket.on('contactRequest', this.onContactRequest)
    this.userSocket.on('requestAccepted', this.onRequestAccepted)
  }

  addConversationMessage = ({message, conversationId}) => {
    this.conversations.appendMessage(message, conversationId)
    // this.conversations.incomingMessageSubject.next(new Message(message))
  }

  onContactRequest = (request) => {
    console.log('on contact request', request)
    request.contact.status = request.contactStatus
    this.contacts.Contacts.addContact(request.contact)
    // this.conversations.Conversations.addConversation(request.conversation)
  }

  onRequestAccepted = (request) => {
    console.log('on contact accepted', request)
  }

  joinRooms ({conversations}) {
    conversations.forEach(({conversation}) => {
      this.chatSocket.emit('joinRoom', conversation._id)
      // console.log('joining room ' + conversation._id)
    })
  }
  joinMyRoom () {
    this.userSocket.emit('joinRoom', this.session.sessionId) 
  }
  
  addChatMessage (message, userId) {
    this.defaultSocket.emit('chat')
  }
  emitMessage (message) {
    this.defaultSocket.emit('message', message)
  }
  msgHandler = (msg) => {
    console.log(msg) 
  }
}
