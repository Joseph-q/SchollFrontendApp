import { AsyncPipe } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StudentResponse } from '@core/services/student/interfaces/response/StudentResponse.interface';
import { StudentsService } from '@core/services/student/students.service';
import { NotificationService } from '@core/services/notification/notification.service';


@Component({
  selector: 'app-card-student',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './card-student.component.html',
  styleUrl: './card-student.component.scss',
})
export class CardStudentComponent implements OnInit {
  @Input({ required: true }) studentId: string | null = null;

  @Output() onUpdate: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  studentInfo!: Observable<StudentResponse | null>;

  constructor(
    private studentService: StudentsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.studentId)
      this.studentInfo = this.studentService.getStudent(this.studentId).pipe(
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
    this.onUpdate.emit();
  }

  OnDelete() {
    this.onDelete.emit();
  }

  onWhatsApp(contactNumber: number) {}

  onEmail(email: string) {}
}
