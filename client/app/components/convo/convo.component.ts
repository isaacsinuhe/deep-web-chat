import { Component, OnInit, Input } from '@angular/core'
import { ConversationsService } from './../../services/conversations.service'

@Component({
  selector: 'deep-convo',
  templateUrl: './convo.component.html',
  styleUrls: ['./convo.component.css']
})
export class ConvoComponent implements OnInit {
  @Input () name
  @Input () lastMessage
  @Input () participants
  @Input () status
  @Input () id

  constructor(private conversationService: ConversationsService) { }

  ngOnInit() {
  }
  displayConversation () {
    console.log(this.id)
    this.conversationService.updateCurrentConversation(this.id)
  }
}
