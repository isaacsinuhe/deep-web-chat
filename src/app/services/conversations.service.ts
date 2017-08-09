import { Injectable } from '@angular/core';
import * as moment from 'moment'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ConversationsService {
  mockMessageList
  constructor() {
    this.mockMessageList = [
      {content: 'lorem l;fal;kdfa ;kldfklj;lj ;akdj;klf ald;kl fja', owner: 'LKDJFAJ84FPOIWEJ', date: moment()},
      {content: '7afsh7o h7u h7 hu7 fhu7as9h d', owner: 'uf7equ7', date: moment()},
      {content: 'Jon jis ;laksj df', owner: 'Jesus', date: moment()},
      {content: 'aaaaaaaaaaa bbbbbbbbbbbbbbbbbbb cccccccccccccccc ddddddd', owner: 'M3', date: moment()},
    ]
  }

  getMessages (conversationId) {
    // somehow fetch messages for that convo id
    return Observable.from(this.mockMessageList)
  }

}
