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
    const params = new URLSearchParams()
    params.set('userId', this.session.sessionId)
    
    return this.http
      .get(`/api/user/contacts`, {search: params})
      .map(res => res.json())
      .do(contacts => this.notifyContactChange(contacts))
  }

  searchContacts (criteria) {
    const params = new URLSearchParams()
    params.set('criteria', criteria)

    return this.http
      .get('/api/user/contacts/search', {search: params})
      .map( contacts => contacts.json())
  }

  notifyContactChange (change) {
    this.contactsSubject.next(change)
  }

}
