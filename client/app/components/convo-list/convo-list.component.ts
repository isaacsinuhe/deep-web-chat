import { Component, OnInit, HostBinding } from '@angular/core';
import { enterFromRight } from '../../animations'
import { SessionService } from '../../services/session.service'


@Component({
  selector: 'deep-convo-list',
  templateUrl: './convo-list.component.html',
  styleUrls: ['./convo-list.component.css'],
  animations: [ enterFromRight ]
})
export class ConvoListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true

  convoList = []

  constructor(private session: SessionService) {
    
    this.session.sessionChanges$.subscribe(
      (data) => {console.log('async sessionchanges in convolist compo', data);
      }
    )
    this.session.getConversations()
    .subscribe((convo) => {
      // console.log('from convo list component', convo)
      this.convoList.push(convo)
    })
  }

  ngOnInit() {
  }

}
