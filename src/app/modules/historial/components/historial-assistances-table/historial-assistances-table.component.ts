import { AsyncPipe, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { map, Observable, of, Subject, takeUntil } from 'rxjs';

import { RangeDate } from '@core/services/assitance/interfaces/req/AssitanceSumaryQuery';
import { AssistanceSummaryResponse } from '@core/services/assitance/interfaces/res/AssistanceSumaryResponse';
import { AssistanceService } from '@core/services/assitance/assistance.service';

@Component({
  selector: 'app-historial-assistances-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule, DatePipe],
  templateUrl: './historial-assistances-table.component.html',
  styleUrl: './historial-assistances-table.component.scss',
})
export class HistorialAssistancesTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private unsubscribe$ = new Subject<void>();
  private assistanceService = inject(AssistanceService);
  private _datasource!: AssistanceSummaryResponse;

  protected readonly displayedColumns: string[] = ['date', 'total'];

  protected rangeDate: RangeDate = {
    startDate: new Date(),
    endDate: new Date(),
  };

  @Input() set range(rangeDate: RangeDate) {
    if (
      this.rangeDate.startDate === rangeDate.startDate &&
      this.rangeDate.endDate === rangeDate.endDate
    ) {
      return;
    }
    this.rangeDate = rangeDate;

    this.assistanceService
      .getAssistanceSummary({ rangeDate: this.rangeDate })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((v) => (this._datasource = v));
  }

  @ViewChild(MatSort) sort!: MatSort;

  @Input({
    transform: (
      v: AssistanceSummaryResponse | Observable<AssistanceSummaryResponse>
    ) => {
      if (v instanceof Observable) return v;

      return of(v);
    },
  })
  dataSource: Observable<AssistanceSummaryResponse> | null = null;

  get assistanceHistorial(): AssistanceSummaryResponse {
    return this._datasource;
  }

  private normalizeSort(sort: Sort): string {
    return (
      sort.active +
      sort.direction.charAt(0).toUpperCase() +
      sort.direction.slice(1)
    );
  }

  ngOnInit(): void {
    if (this.dataSource != null) {
      this.dataSource
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((v) => (this._datasource = v));
      return;
    }

    this.assistanceService
      .getAssistanceSummary({
        rangeDate: this.rangeDate,
      })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((v) => (this._datasource = v));
  }

  ngAfterViewInit(): void {
    this.sort.sortChange
      .pipe(map((v) => this.normalizeSort(v)))
      .subscribe(() => {
        this._datasource = {
          ...this._datasource,
          data: this._datasource.data.reverse(),
        };
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
