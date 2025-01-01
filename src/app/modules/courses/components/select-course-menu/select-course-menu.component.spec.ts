import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCourseMenuComponent } from './select-course-menu.component';

describe('SelectCourseMenuComponent', () => {
  let component: SelectCourseMenuComponent;
  let fixture: ComponentFixture<SelectCourseMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCourseMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCourseMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
