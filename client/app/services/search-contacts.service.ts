import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/from'

@Injectable()
export class SearchContactsService {
  contactlist
  constructor() { }
  getSearchList ( query ) {
    return Observable.from(
    [
      {
        name: 'jjj',
        username: 'jjj',
        country: 'jjj',
      },
      {
        name: 'fdaf',
        username: 'juy',
        country: '6845',
      },
      {
        name: 'juy',
        username: '6845',
        country: 'jjj',
      },
      {
        name: '6845',
        username: 'fdaf',
        country: 'juy',
      },
      {
        name: 'test',
        username: 'fdaf',
        country: 'juy',
      },
      {
        name: 'testa2',
        username: 'fdaf',
        country: 'juy',
      },
      {
        name: 'testa2',
        username: 'fdaf',
        country: 'juy',
      },
      {
        name: 'testa2',
        username: 'fdaf',
        country: 'juy',
      },
    ])
  }
}
