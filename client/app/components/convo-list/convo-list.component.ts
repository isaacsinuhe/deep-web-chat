import { Component, OnInit, HostBinding } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material'
import { enterFromRight } from '../../animations'
import { SessionService } from '../../services/session.service'
import { ConversationsService } from '../../services/conversations.service'
import { GroupConversationDialogComponent } from '../../components/group-conversation-dialog/group-conversation-dialog.component'


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
    public dialog: MdDialog, 
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

  addGroupConversation () {
    this.baseDialog(GroupConversationDialogComponent)
    .flatMap((result) => this.conversationsService.addGroupConversation(result))
    .subscribe((result) => {
      console.log(result)
    })
  }

  ngOnInit() {
    // this.convoList = this.conversationsService.Conversations.getAllAsArray()
  }

  baseDialog(component) {
    const dialogRef = this.dialog.open(component, {
      width: '500px'
    })
    return dialogRef.afterClosed()
  }

}
