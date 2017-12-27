import { Component, OnInit, HostBinding, OnChanges } from '@angular/core';
import { enterFromRight } from '../../animations'
import { SessionService } from '../../services/session.service'
import { ContactsService } from '../../services/contacts.service'

@Component({
  selector: 'deep-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
  animations: [ enterFromRight ]
})
export class NotificationListComponent implements OnInit, OnChanges {
  @HostBinding('@routeAnimation') routeAnimation = true;
  public notifList
  // constructor(private sS: SessionService) { }

  // ngOnInit() {
  //   // this.sS.getNotifications().subscribe( n => {
  //   //   this.notifList.push(n)
  //   // })
  // }
  constructor(public contacts: ContactsService) {
  }
  ngOnInit() {
    // this.notifList = this.contacts.Contacts.contactList
    // this.contacts.contactsChange$
    //   .subscribe(contactList => {
    //     this.notifList = contactList
    //     console.log(contactList);
        
    //   })
    
    // this.contacts.getContacts().subscribe(console.log)
  }
  ngOnChanges (changes) {
    console.log(changes, 'changes in notif list');
    
  }

}
