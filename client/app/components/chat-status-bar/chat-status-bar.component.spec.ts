import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatStatusBarComponent } from './chat-status-bar.component';

describe('ChatStatusBarComponent', () => {
  let component: ChatStatusBarComponent;
  let fixture: ComponentFixture<ChatStatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatStatusBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
