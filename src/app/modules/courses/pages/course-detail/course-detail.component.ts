import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
  numberAttribute,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Observable, Subject } from 'rxjs';

import { CourseService } from '@core/services/courses/courses.service';
import { CoursesResponse } from '@core/services/courses/interfaces/response/courses.response.interface';

import { FilterTableComponent } from '@shared/components/filter-table/filter-table.component';
import { AsyncPipe } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CourseDataComponent } from '../../components/course-data/course-data.component';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    //Angular Material
    MatButtonToggleModule,
    //Angular
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    //shared
    FilterTableComponent,
    CourseDataComponent,
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  private courseService = inject(CourseService);
  private unsubscribe$ = new Subject<void>();
  public courseId: number = 0;

  public courseResponse!: Observable<CoursesResponse>;

  @Input({ transform: numberAttribute }) set id(courseId: number) {
    if (!courseId) return;
    this.courseId = courseId;
  }

  ngOnInit(): void {
    this.courseResponse = this.courseService.getCourses(1, 50);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
