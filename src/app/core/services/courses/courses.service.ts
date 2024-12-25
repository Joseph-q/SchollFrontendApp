import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

import { CoursesResponse } from '@core/services/courses/interfaces/response/courses.response.interface';
import { CourseResponse } from '@core/services/courses/interfaces/response/course.response.interface';
import { CreateCourseRequest } from '@core/services/courses/interfaces/request/CreateCourseRequest';
import { UpdateCourseRequest } from '@core/services/courses/interfaces/request/UpdateCourseRequest';
import { NotificationService } from '@core/services/notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private url = 'http://localhost:8080/courses';
  private updateTrigger$ = new BehaviorSubject<void>(undefined); // Disparador de actualizaciones

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  getCourses(page?: number, limit?: number): Observable<CoursesResponse> {
    return this.updateTrigger$.pipe(
      switchMap(() => this.http.get<CoursesResponse>(this.url))
    );
  }

  getCourse(id: number): Observable<CourseResponse> {
    return this.updateTrigger$.pipe(
      switchMap(() => this.http.get<CourseResponse>(`${this.url}/${id}`))
    );
  }

  createCourse(course: CreateCourseRequest) {
    return this.http.post<null>(this.url, course).pipe(
      tap({
        complete: () => {
          this.notificationService.sendCompleteMessage(
            'Curso Agregado Correctamente!!'
          );
          this.updateTrigger$.next();
        },
      })
    );
  }

  updateCourse(id: number, course: UpdateCourseRequest) {
    return this.http.post<null>(`${this.url}/${id}`, course).pipe(
      tap({
        complete: () => {
          this.notificationService.sendCompleteMessage(
            'Curso Actualizado Correctamente!!'
          );
          this.updateTrigger$.next();
        },
      })
    );
  }
}
