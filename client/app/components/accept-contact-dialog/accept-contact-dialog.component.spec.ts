import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptContactDialogComponent } from './accept-contact-dialog.component';

describe('AcceptContactDialogComponent', () => {
  let component: AcceptContactDialogComponent;
  let fixture: ComponentFixture<AcceptContactDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptContactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
