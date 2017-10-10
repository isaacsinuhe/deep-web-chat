import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import 'rxjs/add/operator/timeout'
// import { SearchContactsService } from '../../services/search-contacts.service'
import { ContactsService } from '../../services/contacts.service'
import { enterFromRight } from '../../animations'
import { Contact, Contacts} from '../../models/contacts'

@Component({
  selector: 'deep-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [enterFromRight]
})
export class SearchComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  
  searchForm
  searchList 
  constructor(private fb: FormBuilder, private contacts: ContactsService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]]
    })
    // fully implement this service
  }

  notInContactList (id) {
    return !this.contacts.isContactInContactList(id)
  }

  search () {
    const query = this.searchForm.get('search').value

    this.searchList = []
    if (!query) { return }

    this.contacts.searchContacts(query)
      .subscribe( (arr) => {
        this.searchList = arr
        console.log(this.searchList)
      })
  }

}
