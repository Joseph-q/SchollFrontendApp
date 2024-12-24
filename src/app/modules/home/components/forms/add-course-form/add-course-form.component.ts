import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './add-course-form.component.html',
  styleUrl: './add-course-form.component.scss',
})
export class AddCourseFormComponent {
  cursoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario
    this.cursoForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }
  // Método para enviar los datos del formulario
  onSubmit() {
    if (this.cursoForm.valid) {
      console.log(this.cursoForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
