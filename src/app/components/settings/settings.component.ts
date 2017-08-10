import { Component, OnInit, HostBinding } from '@angular/core'
import { enterFromRight } from '../../animations'

@Component({
  selector: 'deep-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [enterFromRight]
})
export class SettingsComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }

}
