import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CoursesResponse } from '@core/services/courses/interfaces/response/courses.response.interface';
import { CourseResponse } from '@core/services/courses/interfaces/response/course.response.interface';



@Injectable({
    providedIn: 'root'
  })
  export class CourseService {
  
    private url = 'http://localhost:8080/courses';
  
    constructor(private http: HttpClient) {}
  
    getCourses(page?:number,limit?:number): Observable<CoursesResponse> {
      return this.http.get<CoursesResponse>(this.url)
    }
  
    getCourse(id: number): Observable<CourseResponse> {
      return this.http.get<CourseResponse>(`${this.url}/${id}`)
    }
  
  }
  