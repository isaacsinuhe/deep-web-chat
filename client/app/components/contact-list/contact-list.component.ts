import { Component, OnInit, HostBinding } from '@angular/core';
import { enterFromRight } from '../../animations'
import { ContactsService } from '../../services/contacts.service'

@Component({
  selector: 'deep-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  animations: [ enterFromRight ]
})
export class ContactListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  public contactList = []

  constructor(private contacts: ContactsService) {
  }
  ngOnInit() {
    this.contacts.contactsChange$
      .subscribe( contactList => {
        this.contactList = contactList
      })
    this.contacts.getContacts()
    .subscribe(console.log)
  }

}
