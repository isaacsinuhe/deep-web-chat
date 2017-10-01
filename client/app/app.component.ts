import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import 'hammerjs'

@Component({
  selector: 'deep-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor (translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

}
