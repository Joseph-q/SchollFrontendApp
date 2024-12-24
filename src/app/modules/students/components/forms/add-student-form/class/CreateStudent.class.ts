import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { CreateStudentRequest } from '@core/services/student/interfaces/request/CreateStudentRequest.interface';

import { GenderEnum } from '@shared/modules/students/constants/GenderEnum';
import { PhoneNumber } from '@shared/modules/students/components/phone-input/interface/phone-number.interface';

export interface AddStudentForm {
  name: FormControl<string | null>;
  lastname: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<PhoneNumber | null>;
  course: FormControl<number | null>;
  birthday: FormControl<Date | null>;
  gender: FormControl<GenderEnum | null>;
}

export class CreateStudent {
  private name: AbstractControl<string | null, string | null> | null;
  private lastname: AbstractControl<string | null, string | null> | null;
  private email: AbstractControl<string | null, string | null> | null;
  private phone: AbstractControl<
    PhoneNumber | null,
    PhoneNumber | null
  > | null;
  private course: AbstractControl<number | null, number | null> | null;
  private birthday: AbstractControl<Date | null, Date | null> | null;
  private gender: AbstractControl<GenderEnum | null, GenderEnum | null> | null;

  constructor(private createStudent: FormGroup<AddStudentForm>) {
    this.name = this.createStudent.get('name');
    this.lastname = this.createStudent.get('lastname');
    this.email = this.createStudent.get('email');
    this.phone = this.createStudent.get('phone');
    this.course = this.createStudent.get('course');
    this.birthday = this.createStudent.get('birthday');
    this.gender = this.createStudent.get('gender');
  }

  get StudentToCreate(): CreateStudentRequest {
    const formValue = this.createStudent.value;

    var fullPhoneNumber: string | null = null;

    const phone = this.phone?.value;

    if (phone) {
      fullPhoneNumber = `${phone!.area}${phone!.exchange}${phone!.subscriber}`;
    }

    return {
      name: formValue.name!,
      lastname: formValue.lastname!,
      email: formValue.email!,
      number: fullPhoneNumber ?? undefined,
      coursesId: [Number(this.course!.value!)],
      birthday: formValue.birthday!,
      gender: formValue.gender,
    };
  }

  validName(): string | null {
    if (this.name?.invalid) {
      if (this.name.errors?.['required']) {
        return 'El nombre es requerido.';
      } else if (this.name.errors?.['minlength']) {
        return 'El nombre debe tener al menos 2 caracteres';
      }
    }
    return null;
  }

  validLastname(): string | null {
    if (this.lastname?.invalid) {
      if (this.lastname.errors?.['required']) {
        return 'El apellido es requerido.';
      } else if (this.lastname.errors?.['minlength']) {
        return 'El apellido debe tener al menos 2 caracteres.';
      }
    }
    return null;
  }

  validEmail(): string | null {
    if (this.email?.invalid) {
      if (this.email.errors?.['required']) {
        return 'El email es requerido.';
      } else if (this.email.errors?.['email']) {
        return 'Debe ser un email válido.';
      }
    }
    return null;
  }

  validPhone(): string | null {
    if (this.phone?.invalid) {
      if (this.phone.errors?.['minlength']) {
        return 'El número debe tener al menos 10 dígitos.';
      }
    }
    return null;
  }

  validCourse(): string | null {
    if (this.course?.invalid) {
      return 'Introduce un curso';
    }

    return null;
  }

  validBirthday(): string | null {
    return null;
  }

  validGender(): string | null {
    return null;
  }

  IsFormValid(): boolean {
    return this.createStudent.valid ?? false;
  }
}
