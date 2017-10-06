import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveContactDialogComponent } from './remove-contact-dialog.component';

describe('RemoveContactDialogComponent', () => {
  let component: RemoveContactDialogComponent;
  let fixture: ComponentFixture<RemoveContactDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveContactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
