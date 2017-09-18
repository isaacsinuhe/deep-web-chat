import { OnDestroy, Component, OnInit, HostBinding, Input,  Output, EventEmitter } from '@angular/core';
import { slideFromLeftAnimation } from '../../animations'
import { ActivatedRoute } from '@angular/router'
import { SessionService } from './../../services/session.service'

@Component({
  selector: 'deep-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [ slideFromLeftAnimation ]
})
export class DashboardComponent implements OnInit {
  
  state
  @HostBinding('@dashAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  @HostBinding('style.height') height = '90vh';
  @HostBinding('style.width') width = '100%';
  
  constructor(private route: ActivatedRoute, private session: SessionService) { }
  protected sessionState
  ngOnInit() {
    this.route.data
      .subscribe(({0: data}) => {
        this.sessionState = data
      })
  }

  changeState (value) {
    this.state = value
  }
}
