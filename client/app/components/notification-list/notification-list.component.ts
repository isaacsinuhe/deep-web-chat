import { Component, OnInit, HostBinding } from '@angular/core';
import { enterFromRight } from '../../animations'
import { SessionService } from '../../services/session.service'

@Component({
  selector: 'deep-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
  animations: [ enterFromRight ]
})
export class NotificationListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  public notifList = []
  constructor(private sS: SessionService) { }

  ngOnInit() {
    // this.sS.getNotifications().subscribe( n => {
    //   this.notifList.push(n)
    // })
  }

}
