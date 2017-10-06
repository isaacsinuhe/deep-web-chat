import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgnoreContactDialogComponent } from './ignore-contact-dialog.component';

describe('IgnoreContactDialogComponent', () => {
  let component: IgnoreContactDialogComponent;
  let fixture: ComponentFixture<IgnoreContactDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgnoreContactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgnoreContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
