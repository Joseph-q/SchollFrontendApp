import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreateCourseRequest } from '@core/services/courses/interfaces/request/CreateCourseRequest';

interface ICreateCourseForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
}

export class CreateCourseForm implements ICreateCourseForm {
  private form: FormGroup<ICreateCourseForm>;
  name: FormControl<string | null>;
  description: FormControl<string | null>;

  constructor() {
    this.form = new FormGroup<ICreateCourseForm>({
      name: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      description: new FormControl<string | null>(null, [
        Validators.maxLength(50),
      ]),
    });
    this.name = this.form.controls.name;
    this.description = this.form.controls.description;
  }

  public get Form(): FormGroup<ICreateCourseForm> {
    return this.form;
  }

  public get validName(): string | null {
    if (this.name) {
      if (this.name.invalid) {
        if (this.name.errors?.['required']) {
          return 'El nombre es requerido.';
        } else if (this.name.errors?.['minlength']) {
          return 'El nombre debe tener al menos 2 caracteres';
        } else if (this.name.errors?.['maxlength']) {
          return 'El nombre no debe exceder los 50 caracteres';
        }
      }
    }
    return null;
  }

  public get validDescription(): string | null {
    const description = this.form.get('description');
    if (description) {
      if (description.invalid) {
        if (description.errors?.['required']) {
        } else if (description.errors?.['maxlength']) {
          return 'El apellido no debe exceder los 50 caracteres';
        }
      }
    }
    return null;
  }

  public get CourseToCreate(): CreateCourseRequest {
    return {
      name: this.name.value!,
      description: this.description.value,
    };
  }
}
