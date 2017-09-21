import { EventEmitter, ViewChild, Component, OnInit, Output, Input } from '@angular/core';
import * as moment from 'moment'
import { ConversationsService } from '../../services/conversations.service'

@Component({
  selector: 'deep-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  @Input() messages
  @Output() messagesChanges = new EventEmitter
  @ViewChild('message') input

  constructor(private conversations: ConversationsService) { }

  ngOnInit() { }

  addMessage (value) {
    if (!value) return
    this.conversations.addMessage({ content: value })
    this.input.control.setValue('')
  }
}
