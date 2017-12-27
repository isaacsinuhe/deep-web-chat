import { Component, OnInit, HostBinding, ViewChild, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { SessionService } from '../../services/session.service'
import { TranslateService } from '@ngx-translate/core'
import { enterFromRight } from '../../animations'

@Component({
  selector: 'deep-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [enterFromRight]
})
export class SettingsComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block'

  languages = [
    {string: 'Default', value: null}, 
    {string: 'English', value: 'en-US'}, 
    {string: 'Español', value: 'es'}
  ]

  constructor(
    private sessionService: SessionService,
    private translate: TranslateService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.sessionService.sessionChanges$.subscribe(({user: {settings: {language}}}) => {
      this.translate.use(language)
    })
  }

  setLanguage ({value}) {
    if (!value) value = this.translate.getDefaultLang()
    this.sessionService.setLanguage(value)
      .subscribe(language => {
        this.translate.use(language)
      })
  }

}
