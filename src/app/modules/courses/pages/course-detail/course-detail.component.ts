import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { map, Subject, takeUntil } from 'rxjs';

import { CourseService } from '@core/services/courses/courses.service';
import { RangeDate } from '@core/services/assitance/interfaces/req/AssitanceSumaryQuery';
import { CourseFromCoursesResponse } from '@core/services/courses/interfaces/response/courses.response.interface';

import { DatepickerPopupComponent } from '@shared/components/datepicker-popup/datepicker-popup.component';
import { FilterTableComponent } from '@shared/components/filter-table/filter-table.component';
import { PickerRangeTextComponent } from '@shared/components/picker-range-text/picker-range-text.component';
import DateToString from '@shared/functions/format-date-to-string';

interface Link {
  name: string;
  href: string;
}

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    //Angular Material
    MatIconModule,
    MatMenuModule,
    MatListModule,
    //Angular
    RouterOutlet,
    //shared
    DatepickerPopupComponent,
    FilterTableComponent,
    PickerRangeTextComponent,
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  public date: Date = new Date();
  public courseSelected: CourseFromCoursesResponse = {
    id: 0,
    name: '--',
    totalStudents: 0,
  };
  public courses: CourseFromCoursesResponse[] = [];

  //historial
  rangeDate: RangeDate = {
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 10)),
  };

  public listLinks: Link[] = [
    { href: 'assistances', name: 'Asistencias' },
    { href: 'historial', name: 'Historial' },
  ];

  private unsubscribe$ = new Subject<void>();

  @Input() set id(courseId: number | null) {
    if (this.courses.length > 0) {
      this.courseSelected = this.courses.filter(
        (value) => value.id == courseId
      )[0];
    }

    if (!courseId) return;
    this.courseSelected.id = courseId;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  onSelectDate() {
    this.router.navigate([], {
      queryParams: {
        date: DateToString(this.date),
      },
    });
  }

  OnSelectRange(rangeDate: RangeDate) {
    this.rangeDate = rangeDate;

    this.router.navigate([], {
      queryParams: {
        startDate: DateToString(this.rangeDate.startDate),
        endDate: DateToString(this.rangeDate.endDate),
      },
    });
  }

  optionLink: Link = {
    name: '',
    href: '',
  };

  onClickLink(link: Link) {
    this.optionLink = link;

    if (link.href == 'assistances') {
      this.router.navigate(['courses', this.courseSelected.id, link.href], {
        queryParams: {
          date: DateToString(this.date),
        },
      });
      return;
    }

    if (link.href == 'historial') {
      this.router.navigate(['courses', this.courseSelected.id, link.href], {
        queryParams: {
          startDate: DateToString(this.rangeDate.startDate),
          endDate: DateToString(this.rangeDate.endDate),
        },
      });
      return;
    }

    this.router.navigate(['courses', this.courseSelected.id, link.href]);
  }
  onClickCourse(courseId: number) {
    const route = this.router.url.split('/')[3];
    if (!route) {
      this.router.navigate(['courses', courseId]);
      return;
    }
    this.router.navigate([
      'courses',
      courseId,
      route ? route.split('?')[0] : '',
    ]);
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        let date = new Date(params['date']);
        let startDate = new Date(params['startDate']);
        let endDate = new Date(params['endDate']);
        if (!isNaN(date.getTime())) {
          date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
          this.date = date;
        }
        if (!isNaN(startDate.getTime()) && isNaN(endDate.getTime())) {
          startDate.setMinutes(
            startDate.getMinutes() + startDate.getTimezoneOffset()
          );
          endDate.setMinutes(
            endDate.getMinutes() + endDate.getTimezoneOffset()
          );
        }
      });

    this.optionLink = this.listLinks.filter((v) =>
      this.router.url.includes(v.href)
    )[0];

    this.courseService
      .getCourses(1, 50)
      .pipe(
        takeUntil(this.unsubscribe$),
        map((v) => v.courses ?? [])
      )
      .subscribe((v) => {
        this.courseSelected = v.filter(
          (value) => value.id == this.courseSelected.id
        )[0];
        this.courses = v.sort((a, b) => b.name.length - a.name.length);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
