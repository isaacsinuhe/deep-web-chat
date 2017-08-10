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
  @HostBinding('@routeAnimation') routeAnimation = true;

  convoList = []

  constructor( private sS: SessionService) {
    this.sS.getConversations()
    .subscribe((convo) => {
      this.convoList.push(convo)
    })
  }

  ngOnInit() {
  }

}
