import { OnDestroy, Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { slideFromLeftAnimation } from '../../animations'
import { ActivatedRoute } from '@angular/router'

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

  state = 'contacts'
  routeSub
  
  constructor(private aR: ActivatedRoute) { }

  ngOnInit() {
    ({children: [{snapshot: {url: [{path: this.state}]}}]} = this.aR)
  }

  changeState (value) {
    this.state = value
  }


}
