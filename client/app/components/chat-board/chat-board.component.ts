import { ViewChild, Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'

@Component({
  selector: 'deep-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.css']
})
export class ChatBoardComponent implements OnInit {
  @Input() messages

  constructor() { }

  addMessage () {

  }
  
  ngOnInit () { }
}
