import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationErrorComponent } from './notification-error.component';

describe('NotificationErrorComponent', () => {
  let component: NotificationErrorComponent;
  let fixture: ComponentFixture<NotificationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
