import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true
})
export class OnlyNumbersDirective {
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace', 'Tab', 'Enter', 'Escape', 
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
    ];

    if (allowedKeys.includes(event.key) || event.key.match(/^\d$/)) {
      return; // Permitir números y teclas especiales
    }

    event.preventDefault(); // Evitar cualquier otra tecla
  }
}
