import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt'
import { Subject } from 'rxjs/Subject'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { RequestOptions, URLSearchParams } from '@angular/http'
import { SessionService } from '../services/session.service'
import { Contact, Contacts } from '../models/contacts';

@Injectable()
export class ContactsService {
  public Contacts: Contacts

  public contactsSubject
  public contactsChange$

  constructor(
    private http: AuthHttp,
    private session: SessionService) {
    this.contactsSubject = new ReplaySubject(1)
    this.contactsChange$ = this.contactsSubject.asObservable()
  }

  getContactsIds () {
    return `${this.session.sessionId},${this.Contacts.getContactsIds()}`
  }

  getContacts () {
    return this.Contacts.getContactsAsArray()
    // const params = new URLSearchParams()
    // params.set('userId', this.session.sessionId)
    
    // return this.http
    //   .get(`/api/user/contacts`, {search: params})
    //   .map(res => res.json())
    //   .do(contacts => this.notifyContactChange(contacts))
  }

  searchContacts (criteria) {
    const params = new URLSearchParams()
    params.set('criteria', criteria)
    params.set('currentContacts', this.getContactsIds())

    return this.http
      .get('/api/user/contacts/search', {search: params})
      .map( contacts => contacts.json())
  }

  isContactInContactList (id) {
    return this.Contacts.contactList.some((contact, index, array) => {
      return contact._id === id
    })
  }

  notifyContactChange (change) {
    this.contactsSubject.next(change)
  }

  hydrateContacts ({user: {contacts}}) {
    this.Contacts = new Contacts(contacts)
  }

  addContact(contactId) {
    return this.http.post(
      '/api/user/contacts/addContact',
      { contactId, userId: this.session.sessionId })
      .map(response => response.json())
  }

  acceptContact (acceptId) {
    return this.http.post(
      '/api/user/contacts/acceptContact',
      { acceptId, userId: this.session.sessionId })
      .map(response => response.json())
  }
  
  ignoreContact (ignoreId) {
    return this.http.post(
      '/api/user/contacts/ignoreContact',
      { ignoreId, userId: this.session.sessionId })
      .map(response => response.json())
  }

  removeContact (removeId) {

    return this.http.post(
      '/api/user/contacts/removeContact', 
      { removeId, userId: this.session.sessionId })
      .map(response => response.json())
  }
    
}
