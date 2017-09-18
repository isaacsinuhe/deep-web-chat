import { Component, OnInit, HostBinding } from '@angular/core';
import { enterFromRight } from '../../animations'
import { SessionService } from '../../services/session.service'

@Component({
  selector: 'deep-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  animations: [ enterFromRight ]
})
export class ContactListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(private session: SessionService) { }
  public contactList = []
  ngOnInit() {
    this.session.sessionChanges$
      .map(ss => ss.user.contacts)
      .subscribe(
      contacts => {
        this.contactList = contacts
      }
      )
  }

}
