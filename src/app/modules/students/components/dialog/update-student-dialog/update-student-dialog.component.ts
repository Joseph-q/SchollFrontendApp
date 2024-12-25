import { Component, inject, model, signal, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { AddCourseDialogComponent } from '@home/dialog/add-course-dialog/add-course-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { UpdateStudentFormComponent } from '@students/components/forms/update-student-form/update-student-form.component';
import { UpdateStudentForm } from '@students/components/forms/update-student-form/class/UpdateStudentForm.class';

@Component({
  selector: 'app-update-student-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule,
    UpdateStudentFormComponent,
  ],
  templateUrl: './update-student-dialog.component.html',
  styleUrl: './update-student-dialog.component.scss',
})
export class UpdateStudentDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddCourseDialogComponent>);
  readonly data = inject<{studentId:number}>(MAT_DIALOG_DATA);
  readonly studentId= this.data.studentId;

  @ViewChild(UpdateStudentFormComponent)
  studentComponent!: UpdateStudentFormComponent;

  onNoClick() {
    this.dialogRef.close();
  }

  onUpdate() {
    this.studentComponent.OnSubmit()
  }
}
