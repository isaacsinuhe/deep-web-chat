import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { SessionService } from './session.service'
import { AuthHttp, tokenNotExpired } from 'angular2-jwt'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'



@Injectable()
export class LoginService {
  constructor(private http: AuthHttp) { }

  requestLogin (credentials) {
    return this.http.post('/api/login', credentials)
      .map((res) => res.json())
      .do((v) => { 
        console.log(v, tokenNotExpired()) 
      })
  }

}

// @Injectable()
// export class LoginService implements LoginService{
//   constructor(private http: Http) {
//     // define http request
//     // this.request = Observable
//     //   .timer(500)
//     //   .switchMap( () => 
//     //     new Observable( observer => {
//     //       observer.next(true)
//     //     })
//     //   )
//   }

//   requestLogin(credentials) {
//     // return this.request
//     return this.http.post('/api/login', credentials)
//       .map((res) => res.json())
//   }
// }
