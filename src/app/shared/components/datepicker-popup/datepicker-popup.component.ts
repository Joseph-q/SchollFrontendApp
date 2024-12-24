import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  model,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-datepicker-popup',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatMenuModule,
    MatButtonModule,
    MatCard,
    DatePipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './datepicker-popup.component.html',
  styleUrl: './datepicker-popup.component.scss',
})
export class DatepickerPopupComponent {
  @Output() _userSelection: EventEmitter<void> = new EventEmitter();

  selected = model<Date | null>(new Date());
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  OnDateSelected() {
    this.trigger.closeMenu();

    this._userSelection.emit();
  }
}
