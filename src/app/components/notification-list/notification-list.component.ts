import { Component, OnInit, HostBinding } from '@angular/core';
import { enterFromRight } from '../../animations'

@Component({
  selector: 'deep-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
  animations: [ enterFromRight ]
})
export class NotificationListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }

}
