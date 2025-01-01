import {
  Component,
  inject,
  Input,
  model,
  numberAttribute,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { CourseFromCoursesResponse } from '@core/services/courses/interfaces/response/courses.response.interface';

@Component({
  selector: 'app-select-course-menu',
  standalone: true,
  imports: [MatSelectModule],
  templateUrl: './select-course-menu.component.html',
  styleUrl: './select-course-menu.component.scss',
})
export class SelectCourseMenuComponent {
  private router = inject(Router);
  private _courses: CourseFromCoursesResponse[] = [];

  @Input({ transform: numberAttribute }) courseId = 0;

  @Input() set courses(courses: CourseFromCoursesResponse[]) {
    this._courses = courses;
  }

  onSelectCourse() {
    this.router.navigate(this.handleRoute(this.courseId));
  }

  handleRoute(courseId: number): any[] {
    const route = this.router.url.split('/')[3];
    if (!route) {
      return ['courses', courseId];
    }
    return ['courses', courseId, route ? route.split('?')[0] : ''];
  }

  get courses(): CourseFromCoursesResponse[] {
    return this._courses;
  }
}
