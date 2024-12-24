import { AsyncPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { Observable, of, Subject, tap } from 'rxjs';

import { RangeDate } from '@core/services/assitance/interfaces/req/AssitanceSumaryQuery';
import { AssistanceSummary, AssistanceSummaryResponse } from '@core/services/assitance/interfaces/res/AssistanceSumaryResponse';
import { AssistanceService } from '@core/services/assitance/assistance.service';

@Component({
  selector: 'app-historial-assistances-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule, AsyncPipe, DatePipe],
  templateUrl: './historial-assistances-table.component.html',
  styleUrl: './historial-assistances-table.component.scss',
})
export class HistorialAssistancesTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private unsubscribe$ = new Subject<void>();
  private assistanceService = inject(AssistanceService);

  protected readonly displayedColumns: string[] = ['date', 'total'];
  protected rangeDate: RangeDate = {
    startDate: new Date(),
    endDate: new Date(),
  };
  protected assistanceHistorial$!: Observable<AssistanceSummaryResponse>;

  @ViewChild(MatSort) sort!: MatSort;
  @Input() dataSource:
    | AssistanceSummaryResponse
    | Observable<AssistanceSummaryResponse> = this.assistanceHistorial$;

  data: AssistanceSummary[] = [];
  @Input() set range(rangeDate: RangeDate) {
    if (
      this.rangeDate.startDate === rangeDate.startDate &&
      this.rangeDate.endDate === rangeDate.endDate
    ) {
      return;
    }
    this.rangeDate = rangeDate;
    this.assistanceHistorial$ = this.assistanceService
      .getAssistanceSumary({
        rangeDate: this.rangeDate,
      })
      .pipe(tap((v) => (this.data = v.data)));
  }

  ngOnInit(): void {
    if (this.dataSource) {
      this.assistanceHistorial$ =
        this.dataSource instanceof Observable
          ? this.dataSource
          : of(this.dataSource);
      return;
    }
    if (!this.assistanceHistorial$) {
      this.assistanceHistorial$ = this.assistanceService
        .getAssistanceSumary({
          rangeDate: this.rangeDate,
        })
        .pipe(tap((v) => (this.data = v.data)));
    }
    return;
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe((v) => {
      this.displayedColumns.map((colum) => {
        if (v.active + v.direction == `${colum}desc`) {
          this.assistanceHistorial$ = of({
            data: [...this.data.reverse()],
          });
        }

        if (v.active + v.direction == `${colum}asc`) {
          this.assistanceHistorial$ = of({
            data: [...this.data.reverse()],
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
