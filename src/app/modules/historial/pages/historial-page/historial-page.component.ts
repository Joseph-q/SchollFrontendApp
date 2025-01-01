import { AsyncPipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { Observable } from 'rxjs';

import { AssistanceService } from '@core/services/assitance/assistance.service';
import { AssistanceSummaryResponse } from '@core/services/assitance/interfaces/res/AssistanceSumaryResponse';
import { RangeDate } from '@core/services/assitance/interfaces/req/AssitanceSumaryQuery';

import { CardStatisticsComponent } from '@shared/components/card-statistics/card-statistics.component';
import { FilterTableComponent } from '@shared/components/filter-table/filter-table.component';
import { PickerRangeTextComponent } from '@shared/components/picker-range-text/picker-range-text.component';

import { HistorialAssistancesTableComponent } from '../../components/historial-assistances-table/historial-assistances-table.component';
import { HistorialSvg } from '../../svg/historial-svg.component';

@Component({
  selector: 'app-historial-page',
  standalone: true,
  imports: [
    HistorialAssistancesTableComponent,
    FilterTableComponent,
    PickerRangeTextComponent,
    CardStatisticsComponent,
    HistorialSvg,
    AsyncPipe,
  ],
  templateUrl: './historial-page.component.html',
  styleUrl: './historial-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HistorialPageComponent implements OnInit {
  private assistanceService: AssistanceService = inject(AssistanceService);
  protected rangeDate = signal<RangeDate>({
    startDate: new Date(new Date().setDate(1)), // Primer día del mes actual
    endDate: new Date(
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    ), // Último día del mes actual
  });

  todayHistorial!: Observable<AssistanceSummaryResponse>;

  ngOnInit(): void {
    this.todayHistorial = this.assistanceService.getAssistanceSummary({
      rangeDate: { startDate: new Date(), endDate: new Date() },
    });
  }
}
