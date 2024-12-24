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



@Component({
  selector: 'app-assistances-table',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatMenuModule],
  templateUrl: './assistances-table.component.html',
  styleUrl: './assistances-table.component.scss',
})
export class AssistancesTableComponent implements OnInit, OnDestroy {
  public displayedColumns = ['name', 'number', 'email', 'entrance'];
  public salonAssitances: StudentFromCourseAssit[] = [];
  public totalAssistances: number = 0;
  public courseId: string | null = null;

  private date: Date = new Date();
  private destroy$ = new Subject<void>();

  constructor(
    private assistanceService: AssistanceService,
    private route: ActivatedRoute
  ) {}

  @Input() set id(courseId: string | null) {
    this.courseId = courseId;
    if (!this.courseId) return;
    this.assistanceService
      .getAssistanceSalon(this.courseId, 1, 50, this.date)
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        this.salonAssitances = v.data.students || [];
        this.totalAssistances = this.salonAssitances.length;
      });
  }

  ngOnInit(): void {
    if (!this.courseId) return;

    this.route.queryParams
      .pipe(
        takeUntil(this.destroy$),
        map((params) => this.extractDate(params['date'])), // Método para extraer y validar la fecha
        filter((date) => date !== null), // Continúa solo si la fecha es válida
        tap((date) => (this.date = date!)), // Asigna la fecha
        switchMap((date) => this.loadAssistanceSalon(date!)) // Método para cargar datos
      )
      .subscribe((students) => {
        this.totalAssistances = students.length;
        this.salonAssitances = students; // Evita reasignar observables
      });
  }

  // Métodos auxiliares
  private extractDate(dateParam: string): Date | null {
    const date = new Date(dateParam);
    return isNaN(date.getTime()) ? null : date;
  }

  private loadAssistanceSalon(date: Date): Observable<StudentFromCourseAssit[]> {
    if (!this.courseId) {
      return of([]); // Devuelve un observable vacío si no hay curso
    }
    return this.assistanceService
      .getAssistanceSalon(this.courseId, 1, 50, date)
      .pipe(map((response) => response?.data?.students || []));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
