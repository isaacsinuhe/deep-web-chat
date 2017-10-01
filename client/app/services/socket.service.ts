import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'
import { Message } from '../classes/models'
import { ConversationsService } from './conversations.service'
import * as io from 'socket.io-client'

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000';
  private defaultSocket
  public chatSocket

  constructor(private conversations: ConversationsService) {
    // default namespace
    this.defaultSocket = io(this.url)
    this.defaultSocket.on('msg', this.msgHandler)

    // chat namespace
    this.chatSocket = io(this.url + '/chat')
    this.chatSocket.on('msg', this.msgHandler)  
    this.chatSocket.on('conversationMessage', this.conversationMessage)
  }

  conversationMessage = ({message, conversationId}) => {
    this.conversations.appendMessage(message, conversationId)
    // this.conversations.incomingMessageSubject.next(new Message(message))
  }

  joinRooms ({conversations}) {
    conversations.forEach(({conversation}) => {
      this.chatSocket.emit('joinRoom', conversation._id)
      // console.log('joining room ' + conversation._id)
    })
  }
  
  addChatMessage (message, userId) {
    this.defaultSocket.emit('chat')
  }
  emitMessage (message) {
    this.defaultSocket.emit('message', message)
  }
  msgHandler = (msg) => {
    // console.log(msg) 
  }
}
