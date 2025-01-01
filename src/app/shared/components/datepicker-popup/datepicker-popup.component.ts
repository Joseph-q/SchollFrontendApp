import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  model,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import DateToString from '@shared/functions/format-date-to-string';

@Component({
  selector: 'app-datepicker-popup',
  standalone: true,
  imports: [
    //Material
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    //Angular
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './datepicker-popup.component.html',
  styleUrl: './datepicker-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerPopupComponent {
  @Output() _userSelection: EventEmitter<void> = new EventEmitter();
  selected = model<Date>(new Date());

  date = new FormControl(this.selected());

  OnDateSelected() {
    if (
      this.date.value == null ||
      DateToString(this.selected()) === DateToString(this.date.value)
    )
      return;
    this.selected.set(this.date.value);
    this._userSelection.emit();
  }
}
