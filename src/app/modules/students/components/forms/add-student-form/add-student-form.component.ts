import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Observable } from 'rxjs';

import { StudentsService } from '@core/services/student/students.service';
import { CourseService } from '@core/services/courses/courses.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { atLeastOneRequired } from '@core/validators/Form/AtLeastOneRequired';
import { CoursesResponse } from '@core/services/courses/interfaces/response/courses.response.interface';


import { PhoneNumber } from '@shared/modules/students/components/phone-input/interface/phone-number.interface';
import { PhoneInputComponent } from '@shared/modules/students/components/phone-input/phone-input.component';
import { GenderEnum } from '@shared/modules/students/constants/GenderEnum';

import { CreateStudent } from './class/CreateStudent.class';


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
  courses$: Observable<CoursesResponse>;

  constructor(
    private studentService: StudentsService,
    private courseService: CourseService,
    private notificationService: NotificationService
  ) {
    this.courses$ = this.courseService.getCourses();
  }
  formError: WritableSignal<string | null> = signal(null);
  nameError: WritableSignal<string | null> = signal(null);
  lastnameError: WritableSignal<string | null> = signal(null);
  emailError: WritableSignal<string | null> = signal(null);
  numberError: WritableSignal<string | null> = signal(null);
  courseError: WritableSignal<string | null> = signal(null);

  AddStudentForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      email: new FormControl<string | null>(null, [Validators.email]),
      phone: new FormControl<PhoneNumber | null>(null),
      birthday: new FormControl<Date | null>(null),
      gender: new FormControl<GenderEnum | null>(null),
      course: new FormControl<number | null>(0, [Validators.required]),
    },
    {
      validators: atLeastOneRequired('email', 'phone'),
    }
  );

  OnCreated() {
    this.created.emit();
  }

  OnSubmit() {
    this.nameError.set(null);
    this.lastnameError.set(null);
    this.emailError.set(null);
    this.numberError.set(null);
    this.courseError.set(null);
    this.formError.set(null);

    const user = new CreateStudent(this.AddStudentForm);

    this.nameError.set(user.validName());
    this.lastnameError.set(user.validLastname());
    this.emailError.set(user.validEmail());
    this.numberError.set(user.validPhone());
    this.courseError.set(user.validCourse());

    if (this.AddStudentForm.errors?.['atLeastOneRequired']) {
      console.log('Al menos uno ');
      this.formError.set(
        'Al menos uno de los campos (Email o Teléfono) debe ser completado.'
      );
    }

    if (user.IsFormValid()) {
      this.studentService.createStudent(user.StudentToCreate).subscribe({
        complete: () => {
          this.notificationService.sendCompleteMessage(
            `Estudiante ${user.StudentToCreate.name} creado`
          );
          this.OnCreated();
        },
      });
    }
  }
}
