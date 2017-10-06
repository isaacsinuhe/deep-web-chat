import { Component, OnInit, HostBinding } from '@angular/core';
import { enterFromRight } from '../../animations'
import { SessionService } from '../../services/session.service'
import { ConversationsService } from '../../services/conversations.service'


@Component({
  selector: 'deep-convo-list',
  templateUrl: './convo-list.component.html',
  styleUrls: ['./convo-list.component.css'],
  animations: [ enterFromRight ]
})
export class ConvoListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true

  public convoList = []

  constructor(
    private session: SessionService, 
    private conversationsService: ConversationsService) {
    
    // this.session.sessionChanges$
    //   .map( ss => ss.conversations)
    //   .subscribe(
    //     conversations => {
    //       this.convoList = conversations
    //     }
    //   )
  }

  ngOnInit() {
    console.log(this.conversationsService.Conversations.getAllAsArray());
    
    this.convoList = this.conversationsService.Conversations.getAllAsArray()
  }

}
