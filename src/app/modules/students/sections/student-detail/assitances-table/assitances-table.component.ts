import { AsyncPipe, DatePipe, UpperCasePipe } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";

import { map, Observable, of, Subscription, switchMap, tap } from "rxjs";

import { CourseWithoutStudents } from "@core/services/courses/interfaces/response/course.response.interface";
import { AssistanceService } from "@core/services/assitance/assistance.service";
import { StudentAssistance } from "@core/services/assitance/interfaces/res/AssistancesStudentResponse";
import { ConfigSvg } from "@shared/svg/config-svg.component";

@Component({
  selector: 'app-assitances-table',
  standalone: true,
  imports: [
    //Material
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatMenuModule,
    MatSortModule,
    //Angular
    DatePipe,
    UpperCasePipe,
    AsyncPipe,
    //
    ConfigSvg,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './assitances-table.component.html',
  styleUrl: './assitances-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssitancesTableComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() set id(studentId: any | null) {
    if (studentId && typeof studentId == 'string') {
      this.studentId = studentId;
    }
  }
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assistanceService: AssistanceService
  ) {}

  public displayedColumns = ['date', 'entrance', 'actions'];
  public coursesAssisted$: Observable<CourseWithoutStudents[]> = of([]);
  public studentAssistances$: Observable<StudentAssistance[]> = of([]);
  public courseId: string | null = null;

  public onClickCourse(courseId: number) {
    if (!this.studentId) return;

    this.router.navigate([], {
      queryParams: { courseId: courseId },
    });

    this.studentAssistances$ = this.assistanceService
      .getStudentAssistances(this.studentId, courseId.toString())
      .pipe(
        switchMap((v) => {
          if (v.courses.length > 0) {
            return of(v.courses[0].assistances);
          }
          return of([]); // Return an empty array if no courses are found
        })
      );
    this.courseId = courseId.toString();

    this.sort.sortChange.emit({
      active: this.sort.active,
      direction: this.sort.direction,
    });
  }

  private queryParamsSubscription!: Subscription;
  private studentId: string | null = null;

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.courseId = params['courseId'];
      }
    );
    if (!this.studentId) return;

    this.coursesAssisted$ = this.assistanceService
      .getStudentCourseAssisted(this.studentId)
      .pipe(
        tap((courses) => {
          if(!courses) return;
          if (!this.courseId && courses.length > 0) {
            this.courseId = courses[0].id.toString();
            this.router.navigate([], {
              queryParams: { courseId: this.courseId },
            });
          }

          this.studentAssistances$ = this.assistanceService
            .getStudentAssistances(this.studentId!, this.courseId?.toString())
            .pipe(
              map((data) =>
                data.courses.length > 0 ? data.courses[0].assistances : []
              )
            );
        })
      );
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe((v) => {
      if (this.studentId && this.courseId) {
          let orderBy =
            v.active + v.direction.charAt(0).toUpperCase() + v.direction.slice(1);

        this.studentAssistances$ = this.assistanceService
          .getStudentAssistances(this.studentId!, this.courseId!, orderBy)
          .pipe(
            map((data) =>
              data.courses.length > 0 ? data.courses[0].assistances : []
            )
          );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
