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
    const language = window.navigator && window.navigator.language
    translate.setDefaultLang(language)
  }

}
