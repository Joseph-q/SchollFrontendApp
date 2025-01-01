import { Component, Input } from '@angular/core';
import { SelectCourseMenuComponent } from '../select-course-menu/select-course-menu.component';
import {
  CourseFromCoursesResponse,
  CoursesResponse,
} from '@core/services/courses/interfaces/response/courses.response.interface';

@Component({
  selector: 'app-course-data',
  standalone: true,
  imports: [SelectCourseMenuComponent],
  templateUrl: './course-data.component.html',
  styleUrl: './course-data.component.scss',
})
export class CourseDataComponent {
  _course!: CourseFromCoursesResponse;
  @Input({ required: true }) courseResponse!: CoursesResponse;
  @Input({ required: true }) set id(courseId: number) {
    this._course = this.courseSelected(courseId);
  }

  get course(): CourseFromCoursesResponse {
    return this._course;
  }

  courseSelected(courseId: number): CourseFromCoursesResponse {
    const course = this.courseResponse.courses.find((v) => v.id == courseId);
    if (!course) {
      return {
        id: 0,
        name: '',
        totalStudents: 0,
      };
    }

    return course;
  }
}
