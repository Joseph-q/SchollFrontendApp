import { Pipe, PipeTransform } from '@angular/core';
import FormatPhoneNumber from '../../../utils/func/format-phone-number';

@Pipe({
  name: 'formatPhoneNumber',
  standalone: true,
})
export class FormatPhoneNumberPipe implements PipeTransform {
  transform(value: number): string {
    return FormatPhoneNumber(value);
  }
}
