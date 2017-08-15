import { TestBed, inject } from '@angular/core/testing';

import { SearchContactsService } from './search-contacts.service';

describe('SearchContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchContactsService]
    });
  });

  it('should be created', inject([SearchContactsService], (service: SearchContactsService) => {
    expect(service).toBeTruthy();
  }));
});
