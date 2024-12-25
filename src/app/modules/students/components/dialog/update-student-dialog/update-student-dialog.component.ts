import { Component, inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { UpdateStudentFormComponent } from '@students/components/forms/update-student-form/update-student-form.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-student-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    UpdateStudentFormComponent,
  ],
  templateUrl: './update-student-dialog.component.html',
  styleUrl: './update-student-dialog.component.scss',
})
export class UpdateStudentDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UpdateStudentDialogComponent>);
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
