import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Http, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/switchMap'

import {User} from '../models/user'

@Injectable()
export class SignUpService {
  // request: Observable<boolean>
  constructor(private http: Http) {

    // this.request = Observable
    //   .timer(500)
    //   .switchMap(() =>
    //     new Observable(observer => {
    //       observer.next(true)
    //     })
    //   )

  }

  isUsernameUnique ({value}) {
    
    const http = this.http
    const params = new URLSearchParams()
    params.set('username', value)
    return this.http.get(`/api/user/uniqueUsername`, {search: params})
  }
  isEmailUnique ({value}) {
    const http = this.http
    const params = new URLSearchParams()
    params.set('email', value)
    return this.http.get(`/api/user/uniqueEmail`, {search: params})
  }

  requestSignUp(user) {
    // return this.request
    return this.http.post('/api/user', user)
  }
}

