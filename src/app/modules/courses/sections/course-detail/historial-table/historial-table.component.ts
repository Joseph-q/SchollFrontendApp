import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { map, Observable, Subject, takeUntil, tap } from 'rxjs';

import { AssistanceService } from '@core/services/assitance/assistance.service';
import { RangeDate } from '@core/services/assitance/interfaces/req/AssitanceSumaryQuery';
import { AssistanceCount } from '@core/services/assitance/interfaces/res/HistorialAssistanceResponse';
import { PickerRangeTextComponent } from '../../../../../shared/components/picker-range-text/picker-range-text.component';

@Component({
  selector: 'app-historial-table',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    MatButtonModule,
    MatMenuModule,
    PickerRangeTextComponent,
  ],
  templateUrl: './historial-table.component.html',
  styleUrl: './historial-table.component.scss',
})
export class HistorialTableComponent implements OnDestroy {
  public displayedColumns = ['date', 'total'];
  public courseId: string | null = null;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private assistanceService: AssistanceService = inject(AssistanceService);

  rangeDate = signal<RangeDate>({
    startDate: new Date(new Date().setDate(1)), // Primer día del mes actual
    endDate: new Date(
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    ),
  });

  historialAssistances$!: Observable<AssistanceCount[]>;

  @Input() set id(courseId: string) {
    if (!courseId) return;
    this.courseId = courseId;
    this.historialAssistances$ = this.assistanceService
      .getHistorialAssistances({
        courseId: courseId,
        range: this.rangeDate(),
      })
      .pipe(
        // Extract the 'assistances' array from the response or return an empty array
        map((v) => {
          return v ? v[0].assistances : [];
        })
      );
  }

  onSelecDate(range: RangeDate) {
    if (!this.courseId) return;

    this.historialAssistances$ = this.assistanceService
      .getHistorialAssistances({
        courseId: this.courseId,
        range: range,
      })
      .pipe(
        // Extract the 'assistances' array from the response or return an empty array
        map((v) => {
          return v ? v[0].assistances : [];
        })
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
