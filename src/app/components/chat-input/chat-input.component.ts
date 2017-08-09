import { EventEmitter, ViewChild, Component, OnInit, Output, Input } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'deep-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  @Input() messages
  @Output() messagesChanges = new EventEmitter
  @ViewChild('message') input

  constructor() { }

  ngOnInit() { }

  addMessage (value) {
    if (!value) return
    this.messages.push({content: value, owner: 'MYSELF', date: moment()})
    this.input.control.setValue('')
    

  }

}
