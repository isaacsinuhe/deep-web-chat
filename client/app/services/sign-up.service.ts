import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Http, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/map'

import { User } from '../interfaces/user'

@Injectable()
export class SignUpService {
  // request: Observable<boolean>
  constructor(private http: Http) { }

  isUsernameUnique = ({value}) => {
    const params = new URLSearchParams()
    params.set('username', value)
    return this.http
      .get(`/api/user/uniqueUsername`, { search: params })
      .map( (res) => res.json().repeated ? {repeated: true} : null )
  }

  isEmailUnique ({ value }) {
    const params = new URLSearchParams()
    params.set('email', value)
    
    return this.http
      .get(`/api/user/uniqueEmail`, { search: params })
      .map( (res) => res.json().repeated ? {repeated: true} : null )
  }

  requestSignUp(user) {
    return this.http.post('/api/signup', user)
      .map((res) => res.json())
  }
}

