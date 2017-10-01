import { EventEmitter, ViewChild, Component, OnInit, Output, Input } from '@angular/core';
import * as moment from 'moment'
import { ConversationsService } from '../../services/conversations.service'

@Component({
  selector: 'deep-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  @Input() messages //delete this prop later
  @Output() messagesChanges = new EventEmitter //delete this prop later
  @ViewChild('message') input

  constructor(private conversations: ConversationsService) { }

  ngOnInit() { }

  addMessage (content) {
    if (!content || !this.conversations.currentConvoId) return
    this.conversations.addMessage({ content: content })
    this.input.control.setValue('')
  }
}
