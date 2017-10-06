import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapAsArray'
})
export class MapAsArrayPipe implements PipeTransform {

  transform(value: Map<string, object>, args?: any): any {
    const contacts = []
    value.forEach(contact => {
      contacts.push(contact)
    })
    return contacts
  }

}
