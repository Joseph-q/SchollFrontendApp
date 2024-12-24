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
export class PickerRangeTextComponent implements OnInit {
  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();

  @Input() rangeDate: RangeDate | null = {
    endDate: this.startDate,
    startDate: this.startDate,
  };

  @Output() _onUserSelect = new EventEmitter<RangeDate>();

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(this.startDate),
    end: new FormControl<Date | null>(this.endDate),
  });

  ngOnInit(): void {
    if (this.rangeDate) {
      this.range.patchValue({
        start: this.rangeDate.startDate,
        end: this.rangeDate.endDate,
      });
    } else {
      this.range.patchValue({
        start: this.startDate,
        end: this.endDate,
      });
    }
  }

  onClose() {
    if (this.range.value?.start && this.range.value.end) {
      this._onUserSelect.emit({
        startDate: this.range.value.start,
        endDate: this.range.value.end,
      });
    }
  }
}
