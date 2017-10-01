import { Input, Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service'
import { Moment } from 'moment'

@Component({
  selector: 'deep-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() content
  @Input() date: Moment
  @Input() owner
  private id
  
  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.id = this.sessionService.sessionId
  }

}
