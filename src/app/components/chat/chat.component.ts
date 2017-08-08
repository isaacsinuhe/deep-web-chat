import { Component, OnInit, Input, EventEmitter, 
  Output, DoCheck, OnChanges } from '@angular/core';

@Component({
  selector: 'deep-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, DoCheck, OnChanges {
  @Input () sidebar
  @Input () sidebarContent
  @Output () sidebarContentChange = new EventEmitter
  
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
  }
  changeSidebarState (value) {
    this.sidebarContentChange.emit(value)
  }
  ngDoCheck () {
  }
  toggleSidebar () {
    this.sidebar.toggle()
  }

}
