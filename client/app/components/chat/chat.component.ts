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
  @ViewChild(ChatBoardComponent) charBoard

  constructor(private convoS: ConversationsService) {
  }

  ngOnInit() {
    const convoId = 8
    // somehow getting the convo id from the param
    this.convoS.getMessages(convoId).subscribe( 
      message => this.messages.push(message)
    )
  }
  ngOnChanges() {
    console.log(this.charBoard);
  }
  ngDoCheck () {
  }

}