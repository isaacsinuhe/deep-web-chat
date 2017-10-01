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

  public convoList = []

  constructor(private session: SessionService) {
    this.session.sessionChanges$
      .map( ss => ss.conversations)
      .subscribe(
        conversations => {
          this.convoList = conversations
        }
      )
  }

  ngOnInit() {
  }

}
