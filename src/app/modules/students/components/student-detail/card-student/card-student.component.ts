import { AsyncPipe, Location } from '@angular/common';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { StudentResponse } from '@core/services/student/interfaces/response/StudentResponse.interface';
import { StudentsService } from '@core/services/student/students.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateStudentDialogComponent } from '@students/components/dialog/update-student-dialog/update-student-dialog.component';
import { DeleteDialogComponent } from '@students/components/dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-card-student',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './card-student.component.html',
  styleUrl: './card-student.component.scss',
})
export class CardStudentComponent implements OnInit, OnDestroy {
  @Input({ required: true }) studentId: string | null = null;
  readonly dialog = inject(MatDialog);
  private unsubscribe$ = new Subject<void>();

  studentInfo!: Observable<StudentResponse | null>;

  constructor(
    private studentService: StudentsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.studentId)
      this.studentInfo = this.studentService.getStudent(this.studentId).pipe(
        takeUntil(this.unsubscribe$),
        map((value) => {
          if (!value) {
            this.notificationService.sendErrorMessage(
              'Estudiante no econtrado intentelo de nuevo'
            );
            return null;
          }
          return value;
        })
      );
  }

  OnUpdate() {
    this.dialog.open(UpdateStudentDialogComponent, {
      data: {
        studentId: this.studentId,
      },
    });
  }

  OnDelete() {
    this.dialog
      .open(DeleteDialogComponent, {
        data: {
          studentId: this.studentId,
        },
      })
      .componentInstance.unsubscribe$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.unsubscribe$.next();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
