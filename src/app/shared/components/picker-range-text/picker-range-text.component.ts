import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  model,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { RangeDate } from '@core/services/assitance/interfaces/req/AssitanceSumaryQuery';

@Component({
  selector: 'app-picker-range-text',
  standalone: true,
  imports: [
    //Material
    MatDatepickerModule,
    MatFormFieldModule,
    //Angular
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './picker-range-text.component.html',
  styleUrl: './picker-range-text.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickerRangeTextComponent {
  @Output() _onUserSelect = new EventEmitter<RangeDate>();

  @Input() rangeDate: RangeDate = {
    endDate: new Date(),
    startDate: new Date(),
  };

  readonly range = new FormGroup({
    start: new FormControl<Date>(this.rangeDate.startDate),
    end: new FormControl<Date>(this.rangeDate.endDate),
  });

  onClose() {
    const range = this.range.value;
    if (!range.start || !range.end) return;

    this._onUserSelect.emit({
      startDate: range.start,
      endDate: range.end,
    });
  }
}
