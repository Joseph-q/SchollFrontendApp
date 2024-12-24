import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '@core/services/notification/notification.service';
import { StudentsService } from '@core/services/student/students.service';
import { ModalComponent } from '@shared/components/modal/modal.component';



@Component({
  selector: 'app-warning-delete',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './warning-delete.component.html',
  styleUrl: './warning-delete.component.scss',
})
export class WarningDeleteComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();
  @Output() accept = new EventEmitter<void>();

  @Input() studentId: string | null = null;

  constructor(
    private studentService: StudentsService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query) => {
      if (query.get('studentId')) this.studentId = query.get('studentId');
    });
  }

  cancelButton(): void {
    this.cancel.emit();
  }

  acceptButton(): void {
    if (this.studentId) {
      this.studentService.deleteStudent(this.studentId).subscribe({
        complete: () => {
          this.notificationService.sendCompleteMessage(
            `Elemento eleminado correctamente ID: ${this.studentId}`
          );
          this.accept.emit();
          this.cancelButton();
        },
      });
    }
  }
}
