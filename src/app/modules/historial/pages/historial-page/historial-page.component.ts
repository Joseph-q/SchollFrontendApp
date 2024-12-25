import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from "@angular/core";

import { RangeDate } from "@core/services/assitance/interfaces/req/AssitanceSumaryQuery";

import { HistorialAssistancesTableComponent } from "src/app/modules/historial/components/historial-assistances-table/historial-assistances-table.component";

import { CardStatisticsComponent } from "@shared/components/card-statistics/card-statistics.component";
import { FilterTableComponent } from "@shared/components/filter-table/filter-table.component";
import { PickerRangeTextComponent } from "@shared/components/picker-range-text/picker-range-text.component";

@Component({
  selector: 'app-historial-page',
  standalone: true,
  imports: [
    HistorialAssistancesTableComponent,
    FilterTableComponent,
    PickerRangeTextComponent,
    CardStatisticsComponent,
  ],
  templateUrl: './historial-page.component.html',
  styleUrl: './historial-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HistorialPageComponent {
  protected rangeDate = signal<RangeDate>({
    startDate: new Date(new Date().setDate(1)), // Primer día del mes actual
    endDate: new Date(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)), // Último día del mes actual
  });
}
