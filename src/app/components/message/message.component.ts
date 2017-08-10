import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'deep-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() content
  @Input() date
  @Input() owner
  @Input() mine
  
  constructor() { }

  ngOnInit() {
  }

}
