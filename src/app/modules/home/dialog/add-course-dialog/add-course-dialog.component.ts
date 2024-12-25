import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CourseService } from '@core/services/courses/courses.service';
import { CreateCourseForm } from '@home/components/forms/CreateCourse';

@Component({
  selector: 'app-add-course-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
  ],
  templateUrl: './add-course-dialog.component.html',
  styleUrl: './add-course-dialog.component.scss',
})
export class AddCourseDialogComponent {
  private course = new CreateCourseForm();
  public cursoForm = this.course.Form;

  readonly dialogRef = inject(MatDialogRef<AddCourseDialogComponent>);
  public charCount = 0;
  public maxChars = 0;

  countCharacters(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.charCount = input.length; // Incluye espacios en el conteo
  }

  constructor(private courseService: CourseService) {
    this.maxChars = this.getMaxLengthFromValidator(this.course.description);
  }

  getMaxLengthFromValidator(control: AbstractControl, fallback?: number) {
    const validatorFn = control.validator;
    if (validatorFn === null) {
      return fallback;
    }
    const errors = validatorFn(new FormControl({ length: Infinity }));
    return errors?.['maxlength']['requiredLength'] ?? fallback;
  }

  onNoClick() {
    this.dialogRef.close();
  }
  OnAccept() {
    if (this.cursoForm.invalid) return;

    this.courseService.createCourse(this.course.CourseToCreate).subscribe({
      complete: () => {
        this.dialogRef.close();
      },
    });
  }
}
