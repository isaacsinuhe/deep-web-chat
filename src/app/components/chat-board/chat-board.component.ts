import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'deep-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.css']
})
export class ChatBoardComponent implements OnInit {
  @Input() messages
  constructor() { }

  ngOnInit() {
    
  }

}
