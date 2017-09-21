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

  constructor(private conversationService: ConversationsService) {
  }

  ngOnInit() {
    this.conversationService.currentConvoChange$
      .subscribe( ({ messages, name, participants, updatedAt }) => {
        this.conversation = {name, participants, updatedAt}
        this.messages = messages
      })

    this.conversationService.incomingMessageChange$
      .subscribe( msg => this.messages.push(msg))
  }
  ngOnChanges() {
  }
  ngDoCheck () {
  }

}
