import { Component, OnInit, HostBinding } from '@angular/core';
import { slideFromRightAnimation } from '../../animations'

@Component({
  selector: 'deep-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideFromRightAnimation]
})
export class HomeComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  @HostBinding('style.height') height = '90vh';
  @HostBinding('style.width') width = '100%';

  constructor() { }

  ngOnInit() {
  }

}
