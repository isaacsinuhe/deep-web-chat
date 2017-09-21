import { Input, Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service'

@Component({
  selector: 'deep-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() content
  @Input() date
  @Input() owner
  private id
  
  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.id = this.sessionService.sessionId
  }

}
