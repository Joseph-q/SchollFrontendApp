import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { Subject, takeUntil } from 'rxjs';

import { StudentFromCourseAssit } from '@core/services/assitance/interfaces/res/CourseAssistanceResponse';
import { AssistanceService } from '@core/services/assitance/assistance.service';

import { DatepickerPopupComponent } from '@shared/components/datepicker-popup/datepicker-popup.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-assistances-table',
  standalone: true,
  imports: [
    //Material
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    //Angular

    //Shared Components
    DatepickerPopupComponent,
  ],
  templateUrl: './assistances-table.component.html',
  styleUrl: './assistances-table.component.scss',
})
export class AssistancesTableComponent implements OnDestroy {
  public displayedColumns = ['name', 'number', 'email', 'entrance'];
  public courseAssitances: StudentFromCourseAssit[] = [];
  public totalAssistances: number = 0;
  public courseId: string | null = null;

  protected date: Date = new Date();

  pageIndex = signal(0);
  pageSize = signal(25);

  private destroy$ = new Subject<void>();

  constructor(private assistanceService: AssistanceService) {}

  @Input() set id(courseId: string | null) {
    this.courseId = courseId;
    if (!this.courseId) return;
    this.assistanceService
      .getAssistanceSalon(
        this.courseId,
        this.pageIndex() + 1,
        this.pageSize(),
        this.date
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        this.courseAssitances = v.data.students || [];
        this.totalAssistances = v.metadata.total;
      });
  }

  onSelectDate() {
    this.destroy$.next();
    if (!this.courseId) return;

    this.assistanceService
      .getAssistanceSalon(
        this.courseId,
        this.pageIndex() + 1,
        this.pageSize(),
        this.date
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        this.courseAssitances = v.data.students || [];
        this.totalAssistances = v.metadata.total;
      });
  }

  handlePaginator(page: PageEvent) {
    this.destroy$.next()
    if(!this.courseId) return;

    this.pageIndex.set(page.pageIndex)
    this.pageSize.set(page.pageSize)

    this.assistanceService
      .getAssistanceSalon(
        this.courseId,
        this.pageIndex() + 1,
        this.pageSize(),
        this.date
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        this.courseAssitances = v.data.students || [];
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
