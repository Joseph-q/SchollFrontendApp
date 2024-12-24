import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, signal, WritableSignal } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { AsyncPipe } from "@angular/common";

import { Observable, Subject, takeUntil } from "rxjs";

import { CoursesResponse } from "@core/services/courses/interfaces/response/courses.response.interface";
import { CourseService } from "@core/services/courses/courses.service";
import { StudentsService } from "@core/services/student/students.service";
import { NotificationService } from "@core/services/notification/notification.service";

import { UpdateStudentForm } from "./class/UpdateStudentForm.class";

import { PhoneInputComponent } from "@shared/modules/students/components/phone-input/phone-input.component";





@Component({
  selector: 'app-update-student-form',
  templateUrl: './update-student-form.component.html',
  styleUrl: './update-student-form.component.scss',
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

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateStudentFormComponent implements OnInit, OnDestroy {
  @Output() updated = new EventEmitter<void>();
  
  @Input() studentId: string | null = null;

  public courses$!: Observable<CoursesResponse>;
  //Error handling
  public nameError: WritableSignal<string | null> = signal(null);
  public lastnameError: WritableSignal<string | null> = signal(null);
  public emailError: WritableSignal<string | null> = signal(null);
  public numberError: WritableSignal<string | null> = signal(null);
  public courseError: WritableSignal<string | null> = signal(null);

  private student = new UpdateStudentForm();
  private unsubscribe = new Subject<void>();

  public updateStudentForm = this.student.Form;

  constructor(
    private courseService: CourseService,
    private studentService: StudentsService,
    private notificationService: NotificationService
  ) {
    if (!this.studentId) return;
  }

  public OnUpdated() {
    this.updated.emit();
  }

  public OnSubmit() {
    if (!this.studentId) return;

    this.nameError.set(this.student.validName);
    this.lastnameError.set(this.student.validLastName);
    this.emailError.set(this.student.validEmail);
    this.numberError.set(this.student.validPhone);
    this.courseError.set(this.student.validCourse);

    if (this.updateStudentForm.invalid) return;

    this.studentService
      .updateStudent(this.studentId, this.student.StudentToUpdate)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        complete: () => {
          this.notificationService.sendCompleteMessage(
            'Estudiante Actualizado'
          );
          this.unsubscribe.next();
          this.OnUpdated();
        },
      });
  }

  ngOnInit(): void {
    if (!this.studentId) return;
    this.courses$ = this.courseService.getCourses();

    this.studentService
      .getStudent(this.studentId, 'all')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((v) => {
        this.student.Form = v;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
