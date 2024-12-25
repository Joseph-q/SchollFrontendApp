import { DatePipe } from "@angular/common";
import { Component, inject, Input, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";

import { map, Observable, Subject, takeUntil, tap } from "rxjs";


import { AssistanceService } from "@core/services/assitance/assistance.service";
import { RangeDate } from "@core/services/assitance/interfaces/req/AssitanceSumaryQuery";
import { AssistanceCount } from "@core/services/assitance/interfaces/res/HistorialAssistanceResponse";


@Component({
  selector: 'app-historial-table',
  standalone: true,
  imports: [MatTableModule, DatePipe, MatButtonModule, MatMenuModule],
  templateUrl: './historial-table.component.html',
  styleUrl: './historial-table.component.scss',
})
export class HistorialTableComponent implements OnInit, OnDestroy {
  public displayedColumns = ['date', 'total'];
  public courseId: string | null = null;

  private unsubscribe$: Subject<void> = new Subject<void>();
  private assistanceService: AssistanceService = inject(AssistanceService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  rangeDate: RangeDate = {
    startDate: new Date(new Date().setDate(1)), // Primer día del mes actual
    endDate: new Date(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0))
  };
  @Input() historialAssistances$!: Observable<AssistanceCount[]>;

  @Input() set id(courseId: string) {
    if (!courseId) return;
    this.courseId = courseId;
    this.historialAssistances$ = this.assistanceService
      .getHistorialAssistances({
        courseId: courseId,
        startDate: this.rangeDate.startDate,
        endDate: this.rangeDate.endDate,
      })
      .pipe(
        // Extract the 'assistances' array from the response or return an empty array
        map((v) => {
          return v ? v[0].assistances : [];
        })
      );
  }

  ngOnInit(): void {
    if (!this.courseId) return;

    this.route.queryParams
      .pipe(
        // Automatically unsubscribe when this.unsubscribe$ emits
        takeUntil(this.unsubscribe$),

        // Transform the query parameters into a date range object
        map((params) => {
          // Parse 'startDate' and 'endDate' from the query parameters
          const startDate: Date = new Date(params['startDate']);
          const endDate: Date = new Date(params['endDate']);

          // Check if both dates are valid
          if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            // Adjust timezone offset to normalize the dates
            startDate.setMinutes(
              startDate.getMinutes() + startDate.getTimezoneOffset()
            );
            endDate.setMinutes(
              endDate.getMinutes() + endDate.getTimezoneOffset()
            );

            // Assign the adjusted dates to the rangeDate object
            this.rangeDate.startDate = startDate;
            this.rangeDate.endDate = endDate;
          }
          // Return the updated rangeDate object
          return this.rangeDate;
        }),

        // Perform side effects using the date range
        tap((range) => {
          // Fetch historical assistances using the service and filtered by courseId and date range
          this.historialAssistances$ = this.assistanceService
            .getHistorialAssistances({
              courseId: this.courseId!,
              startDate: range.startDate,
              endDate: range.endDate,
            })
            .pipe(
              // Extract the 'assistances' array from the response or return an empty array
              map((v) => {
                return v ? v[0].assistances : [];
              })
            );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
