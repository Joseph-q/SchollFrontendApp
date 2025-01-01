import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {
  filter,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

import { StudentFromCourseAssit } from '@core/services/assitance/interfaces/res/CourseAssistanceResponse';
import { AssistanceService } from '@core/services/assitance/assistance.service';
import { DatepickerPopupComponent } from '../../../../../shared/components/datepicker-popup/datepicker-popup.component';

@Component({
  selector: 'app-assistances-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
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

  private destroy$ = new Subject<void>();

  constructor(private assistanceService: AssistanceService) {}

  @Input() set id(courseId: string | null) {
    this.courseId = courseId;
    if (!this.courseId) return;
    this.assistanceService
      .getAssistanceSalon(this.courseId, 1, 50, this.date)
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        this.courseAssitances = v.data.students || [];
        this.totalAssistances = this.courseAssitances.length;
      });
  }

  onSelectDate() {
    if (!this.courseId) return;

    this.assistanceService
      .getAssistanceSalon(this.courseId, 1, 50, this.date)
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        this.courseAssitances = v.data.students || [];
        this.totalAssistances = this.courseAssitances.length;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
