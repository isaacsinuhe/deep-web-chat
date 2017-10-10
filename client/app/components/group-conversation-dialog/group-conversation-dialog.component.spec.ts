import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupConversationDialogComponent } from './group-conversation-dialog.component';

describe('GroupConversationDialogComponent', () => {
  let component: GroupConversationDialogComponent;
  let fixture: ComponentFixture<GroupConversationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupConversationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupConversationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
