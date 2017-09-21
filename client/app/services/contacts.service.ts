import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt'
import { Subject } from 'rxjs/Subject'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { RequestOptions, URLSearchParams } from '@angular/http'
import { SessionService } from '../services/session.service'

@Injectable()
export class ContactsService {
  public contactsSubject
  public contactsChange$

  constructor(private http: AuthHttp, private session: SessionService) {
    this.contactsSubject = new ReplaySubject(1)
    this.contactsChange$ = this.contactsSubject.asObservable()
  }

  getContacts () {
    const params = new URLSearchParams(`userId=${this.session.sessionId}`)
    const options = new RequestOptions({ search: params })
    
    return this.http
      .get(`/api/user/contacts`, options)
      .map(res => res.json())
      .do(contacts => this.notifyContactChange(contacts))
  }

  notifyContactChange (change) {
    this.contactsSubject.next(change)
  }

}
