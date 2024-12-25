import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Observable, Subject, takeUntil } from 'rxjs';

import { StudentsService } from '@core/services/student/students.service';
import { CourseService } from '@core/services/courses/courses.service';
import { CoursesResponse } from '@core/services/courses/interfaces/response/courses.response.interface';

import { PhoneInputComponent } from '@shared/modules/students/components/phone-input/phone-input.component';

import { CreateStudentForm } from './class/CreateStudent.class';

@Component({
  selector: 'app-add-student-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
    forwardRef(() => PhoneInputComponent),
    AsyncPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-student-form.component.html',
  styleUrl: './add-student-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddStudentFormComponent {
  @Output() created = new EventEmitter<void>();
  protected formError: WritableSignal<string | null> = signal(null);
  protected nameError: WritableSignal<string | null> = signal(null);
  protected lastnameError: WritableSignal<string | null> = signal(null);
  protected emailError: WritableSignal<string | null> = signal(null);
  protected numberError: WritableSignal<string | null> = signal(null);
  protected courseError: WritableSignal<string | null> = signal(null);

  unsubscribe$ = new Subject<void>();
  courses$: Observable<CoursesResponse>;
  private student = new CreateStudentForm();
  public createStudentForm = this.student.Form;

  
  constructor(
    private studentService: StudentsService,
    private courseService: CourseService,
  ) {
    this.courses$ = this.courseService.getCourses();
  }

  OnCreated() {
    this.created.emit();
  }

  OnSubmit() {
    this.nameError.set(this.student.validName);
    this.lastnameError.set(this.student.validLastName);
    this.emailError.set(this.student.validEmail);
    this.numberError.set(this.student.validPhone);
    this.courseError.set(this.student.validCourse);
    if (this.createStudentForm.errors?.['atLeastOneRequired']) {
      console.log('Al menos uno ');
      this.formError.set(
        'Al menos uno de los campos (Email o Teléfono) debe ser completado.'
      );
    }
    if (this.createStudentForm.invalid) return;

    this.studentService
      .createStudent(this.student.StudentToCreate)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        complete:()=>{
          this.unsubscribe$.next();
        }
      });
  }
}
