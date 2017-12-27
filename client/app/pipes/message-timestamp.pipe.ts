import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment'

@Pipe({
  name: 'messageTimestamp'
})
export class MessageTimestampPipe implements PipeTransform {

  transform(date: Moment, args?: any): any {
    if (!date) return ''
    const formattedDate = `${date.format('MMMM-DD h:mm:ss a')}`
    return formattedDate;
  }

}
