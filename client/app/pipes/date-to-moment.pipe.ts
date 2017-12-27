import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'dateToMoment'
})
export class DateToMomentPipe implements PipeTransform {

  transform(date: string, args?: any): string {
    if (!date) return ''
    const momentDate = moment(date),
          formattedDate = `${momentDate.format('MMMM-DD h:mm:ss a')}`
    return formattedDate;
  }

}
