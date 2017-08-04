import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/switchMap'
import { IUser } from '../services/users.service'

@Injectable()
export class SignUpService {
  request: Observable<boolean>
  constructor(http: Http) {
    // define http request
    this.request = Observable
      .timer(500)
      .switchMap(() =>
        new Observable(observer => {
          observer.next(true)
        })
      )
  }

  requestSignUp(user: IUser) {
    return this.request
  }
}
