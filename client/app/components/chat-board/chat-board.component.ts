import { OnChanges, ViewChild, Component, OnInit, Input, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { ConversationsService } from '../../services/conversations.service'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'

@Component({
  selector: 'deep-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.css']
})
export class ChatBoardComponent implements OnInit, AfterViewChecked, AfterViewInit, OnChanges {
  @Input() messages
  @Input() conversationId
  @ViewChild('container') container
  isScrollEligible

  constructor(private conversationService: ConversationsService) { }

  ngOnInit () { }
  ngAfterViewInit() {
    this.isScrollEligible = true
  }

  ngAfterViewChecked() {
// console.log(this.container.scrollTop, this.container.scrollHeight);
    
    if (this.isScrollEligible) this.scrollToBottom();
    this.isScrollEligible = false
  }
  
  scrollToBottom(): void {
    try {
      const container = this.container.nativeElement
      container.scrollTop = container.scrollHeight - container.clientHeight
    } catch (err) {
      console.log('there was an error trying to scroll to bottom')
    }
  }
  
  ngOnChanges (changes) {
    
    const conversationId = changes.conversationId,
          target = this.container.nativeElement
    
    // if scroll is at top or there is no scroll bar request more messages
    if (target.scrollTop === 0 && this.conversationId) {
      console.log(target.scrollTop, this.conversationId, target.scrollHeight, target.clientHeight, changes)
      this.requestPreviousMessages()
    }

    // if convo changes then scroll down
    if (conversationId && (conversationId.currentValue !== conversationId.previousValue)) {
      this.isScrollEligible = true
    } else {
      // else check the actual position of the scroll and if its at bottom then scroll down on input change
      this.isScrollEligible = (target.scrollTop + target.clientHeight === target.scrollHeight)
    }
  }

  
  onScroll ({target}) {
    if (target.scrollTop === 0) {
      this.requestPreviousMessages()
      this.isScrollEligible = false
    }else if (target.scrollTop + target.clientHeight === target.scrollHeight) {
      this.isScrollEligible = true
    }
  }

  requestPreviousMessages () {
    this.conversationService.getPreviousMessages()
  }
}
