import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'deep-chat-status-bar',
  templateUrl: './chat-status-bar.component.html',
  styleUrls: ['./chat-status-bar.component.css']
})
export class ChatStatusBarComponent implements OnInit {
  @Input() conversation
  constructor() { }

  ngOnInit() {
  }

}
