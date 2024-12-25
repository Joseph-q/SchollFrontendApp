import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";

import { atLeastOneRequired } from "@core/validators/Form/AtLeastOneRequired";
import {StudentResponse} from "@core/services/student/interfaces/response/StudentResponse.interface";
import { CreateStudentRequest } from "@core/services/student/interfaces/request/CreateStudentRequest.interface";

import { PhoneNumber } from "@shared/modules/students/components/phone-input/interface/phone-number.interface";
import { GenderEnum } from "@shared/modules/students/constants/GenderEnum";
import { FormatNumberToString, FormatPhoneNumber } from "@shared/modules/students/components/phone-input/functions/format-phone-number";


interface ICreateStudentForm {
  name: FormControl<string | null>;
  lastname: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<PhoneNumber | null>;
  course: FormControl<number | null>;
  birthday: FormControl<Date | null>;
  gender: FormControl<GenderEnum| null>;

}

export class CreateStudentForm {
  private form: FormGroup<ICreateStudentForm>;
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

  constructor() {
    this.form = new FormGroup<ICreateStudentForm>(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
        lastname: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
        email: new FormControl<string | null>(null, [Validators.email]),
        phone: new FormControl<PhoneNumber | null>(null),
        birthday: new FormControl<Date | null>(null),
        gender: new FormControl<GenderEnum | null>(null),
        course: new FormControl<number | null>(null, [Validators.required]),
      },
      {
        validators: atLeastOneRequired('email', 'phone'),
      }
    );
    this.name = this.form.controls.name;
    this.lastname = this.form.controls.lastname;
    this.email = this.form.controls.email;
    this.phone = this.form.controls.phone;
    this.course = this.form.controls.course;
    this.gender = this.form.controls.gender;
    this.birthday = this.form.controls.birthday;
  }

  public set Form(s: StudentResponse) {
    var phone: PhoneNumber | null = null;
    if (s.number) phone = FormatPhoneNumber(s.number);

    this.form.patchValue({
      name: s.name,
      lastname: s.lastname,
      email: s.email,
      phone: phone,
      birthday: s.birthday ? new Date(s.birthday) : null,
      course: s.courses ? s.courses[0].id : 0,
      gender: s.gender,
    });
  }

  public get Form(): FormGroup<ICreateStudentForm> {
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

  public get validLastName(): string | null {
    const lastname = this.form.get('lastname');
    if (lastname) {
      if (lastname.invalid) {
        if (lastname.errors?.['required']) {
          return 'El apellido es requerido.';
        } else if (lastname.errors?.['minlength']) {
          return 'El apellido debe tener al menos 2 caracteres';
        } else if (lastname.errors?.['maxlength']) {
          return 'El apellido no debe exceder los 50 caracteres';
        }
      }
    }
    return null;
  }

  public get validEmail(): string | null {
    const email = this.form.get('email');
    if (email) {
      if (email.invalid) {
        if (email.errors?.['email']) {
          return 'El email no es válido.';
        }
      }
    }
    return null;
  }

  public get validPhone(): string | null {
    const phone = this.form.get('phone');
    if (phone) {
      if (phone.invalid) {
        return 'El número de teléfono no es válido.';
      }
    }
    return null;
  }

  public get validCourse(): string | null {
    const course = this.form.get('course');
    if (course) {
      if (course.invalid) {
        if (course.errors?.['required']) {
          return 'El curso es requerido.';
        }
      }
    }
    return null;
  }

  public get StudentToCreate(): CreateStudentRequest {
    let phoneNumber: string | undefined;
    if (this.phone && this.phone.value)
      phoneNumber = FormatNumberToString(this.phone.value);

    return {
      name: this.name!.value!,
      lastname: this.lastname!.value!,
      email: this.email?.value,
      number: phoneNumber,
      coursesId: [this.course!.value!],
      birthday: this.birthday?.value,
      gender: this.gender?.value,
    };
  }
}
