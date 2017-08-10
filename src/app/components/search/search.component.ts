import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import 'rxjs/add/operator/timeout'
import { SearchContactsService } from '../../services/search-contacts.service'
import { enterFromRight } from '../../animations'

@Component({
  selector: 'deep-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [enterFromRight]
})
export class SearchComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  
  searchForm
  contactlist
  constructor(private fb: FormBuilder, private sS: SearchContactsService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]]
    })
    // fully implement this service
  }

  search () {
    const query = this.searchForm.get('search').value
    if (!query) return

    this.contactlist = []
    this.sS.getSearchList(query)
      .subscribe( (arr) => {this.contactlist.push(arr)})
  }

}
