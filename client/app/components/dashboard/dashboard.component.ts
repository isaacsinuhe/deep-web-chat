import { OnDestroy, Component, OnInit, HostBinding, Input,  Output, EventEmitter } from '@angular/core';
import { slideFromLeftAnimation } from '../../animations'
import { ActivatedRoute } from '@angular/router'
import { SocketService } from './../../services/socket.service'
import { ContactsService } from './../../services/contacts.service'
import { SessionService } from './../../services/session.service'
import { ConversationsService } from './../../services/conversations.service'

@Component({
  selector: 'deep-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [ slideFromLeftAnimation ]
})
export class DashboardComponent implements OnInit {
  
  // protected sessionState
  state

  @HostBinding('@dashAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  @HostBinding('style.height') height = '90vh';
  @HostBinding('style.width') width = '100%';
  
  constructor(
    private route: ActivatedRoute,
    private socket: SocketService,
    private contactsService: ContactsService,
    private conversationService: ConversationsService,
    private session: SessionService) { }

  ngOnInit() {
    this.route.data
      .subscribe(({0: data}) => {
        this.socket.joinRooms(data)
        this.contactsService.hydrateContacts(data)
        this.conversationService.hydrateConversations(data)
    })
  }

  changeState (value) {
    this.state = value
  }
}
