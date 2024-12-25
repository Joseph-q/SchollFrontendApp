import { Component, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { StudentsService } from '@core/services/student/students.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogTitle
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
})
export class DeleteDialogComponent implements OnDestroy {
  private readonly studentService = inject(StudentsService);
  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  readonly unsubscribe$ = new Subject<void>();
  readonly data = inject<{ studentId: number }>(MAT_DIALOG_DATA);
  readonly studentId = this.data.studentId;

  onNoClick() {
    this.dialogRef.close();
  }

  onAccept() {
    if (!this.studentId) return;
    this.studentService
      .deleteStudent(this.studentId.toString())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({ complete: () => this.dialogRef.close() });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
