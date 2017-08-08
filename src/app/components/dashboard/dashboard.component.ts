import { OnDestroy, Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { slideFromLeftAnimation } from '../../animations'

@Component({
  selector: 'deep-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [ slideFromLeftAnimation ]
})
export class DashboardComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  @HostBinding('style.height') height = '90vh';
  @HostBinding('style.width') width = '100%';

  state = 'single'
  routeSub
  
  constructor() { }

  ngOnInit() { }

  changeState (value) {
    this.state = value
  }


}
