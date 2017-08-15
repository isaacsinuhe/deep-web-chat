import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'deep-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() id
  @Input() senderId
  @Input() senderName
  @Input() title
  @Input() date
  @Input() type
  @Input() content
  constructor() { }

  ngOnInit() {
  }

}
