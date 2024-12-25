import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentDialogComponent } from './update-student-dialog.component';

describe('UpdateStudentDialogComponent', () => {
  let component: UpdateStudentDialogComponent;
  let fixture: ComponentFixture<UpdateStudentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStudentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
