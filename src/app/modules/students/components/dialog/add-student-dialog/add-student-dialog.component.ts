import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddStudentFormComponent } from "../../forms/add-student-form/add-student-form.component";

@Component({
  selector: 'app-add-student-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    AddStudentFormComponent
],
  templateUrl: './add-student-dialog.component.html',
  styleUrl: './add-student-dialog.component.scss',
})
export class AddStudentDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddStudentDialogComponent>);
   @ViewChild(AddStudentFormComponent)
    studentComponent!: AddStudentFormComponent;
  
    onNoClick() {
      this.dialogRef.close();
    }
  
    onUpdate() {
      this.studentComponent.OnSubmit()
    }
}
