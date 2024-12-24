import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function atLeastOneRequired(controlName1: string, controlName2: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control1 = formGroup.get(controlName1);
    const control2 = formGroup.get(controlName2);

    // Si el control1 es un string, se verifica si tiene valor
    const hasValue1 = control1?.value && control1.value.trim() !== '';
    
    // Si el control2 es un objeto (como IPhoneNumber), se verifica si tiene alguna propiedad válida
    const hasValue2 = control2?.value && (typeof control2.value === 'object' 
      ? Object.values(control2.value).some(v => v !== null && v !== '') 
      : control2.value.trim() !== '');

    if (hasValue1 || hasValue2) {
      return null; // No hay error si al menos uno tiene valor
    }

    return { atLeastOneRequired: true };
  };
}
