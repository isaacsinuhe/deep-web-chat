import { Component, OnInit, Input, EventEmitter, 
  Output, DoCheck, OnChanges, ViewChild } from '@angular/core';
import { ChatBoardComponent } from '../../components/chat-board/chat-board.component'
import { ConversationsService } from '../../services/conversations.service'

@Component({
  selector: 'deep-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, DoCheck, OnChanges {
  messages = []
  conversation

  constructor(public conversationService: ConversationsService) {
  }

  ngOnInit() {
    this.conversationService.currentConvoChange$
      .subscribe( ( conversation ) => {        
        this.conversation = conversation
        this.messages = conversation.messages
        // this.messages = [...conversation.messages]
      })  

    // this.conversationService.previousMessagesChange$
    // .subscribe( msg => {
    //   const arr = Array.from(this.messages)
    //   arr.unshift(msg)
    //   this.messages = arr
    // })
    
    // this.conversationService.incomingMessageChange$
    // .subscribe( msg => {      
    //   const arr = Array.from(this.messages)
    //   arr.push(msg)
    //   this.messages = arr
    // })
  }
  ngOnChanges() {
  }
  ngDoCheck () {
  }

}
