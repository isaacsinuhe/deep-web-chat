import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'deep-convo',
  templateUrl: './convo.component.html',
  styleUrls: ['./convo.component.css']
})
export class ConvoComponent implements OnInit {
  @Input () name
  @Input () lastMessages
  @Input () participants
  @Input () status

  constructor() { }

  ngOnInit() {
  }

}
