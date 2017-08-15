import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvoComponent } from './convo.component';

describe('ConvoComponent', () => {
  let component: ConvoComponent;
  let fixture: ComponentFixture<ConvoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
