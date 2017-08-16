import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/switchMap'
import User from '../models/user'
import { IUser } from '../services/users.service'

@Injectable()
export class SignUpService {
  request: Observable<boolean>
  constructor(http: Http) {

    this.request = Observable
      .timer(500)
      .switchMap(() =>
        new Observable(observer => {
          observer.next(true)
        })
      )

  }

  requestSignUp(user: IUser) {
    console.log(new User());
    
    return this.request
    // this.http.post('/api/user', )
  }
}
