import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject, map, Observable } from "rxjs";

import { AssistancesStudentResponse } from "@core/services/assitance/interfaces/res/AssistancesStudentResponse";
import { CourseAssistanceResponse } from "@core/services/assitance/interfaces/res/CourseAssistanceResponse";
import { QueryParamsHistorialAssistance } from "@core/services/assitance/interfaces/req/HistorialAssistanceQueryParams";

import { DataHistorial, HistorialAssistanceResponse } from "@core/services/assitance/interfaces/res/HistorialAssistanceResponse";
import DateToString from "@shared/functions/format-date-to-string";
import { QueryAssistanceSumary, RangeDate } from "@core/services/assitance/interfaces/req/AssitanceSumaryQuery";
import { AssistanceSummaryResponse } from "@core/services/assitance/interfaces/res/AssistanceSumaryResponse";
import { CourseResponse, CourseWithoutStudents } from "@core/services/courses/interfaces/response/course.response.interface";


@Injectable({
  providedIn: 'root',
})
export class AssistanceService {
  private updateTrigger$ = new BehaviorSubject<void>(undefined); // Disparador de actualizaciones
  private url = 'http://localhost:8080/assistances';

  constructor(private http: HttpClient) {}

  getStudentAssistances(
    id: string,
    courseId?: string,
    orderBy?: string,
    date?: Date,
    page?: number,
    limit?: number
  ): Observable<AssistancesStudentResponse> {
    const params = new HttpParams({
      fromObject: {
        ...(page && { page: page.toString() }),
        ...(limit && { limit: limit.toString() }),
        ...(courseId && { courseId: courseId }),
        ...(date && { date: date.toString() }),
        ...(orderBy && { orderBy: orderBy.toString() }),
      },
    });

    return this.http.get<AssistancesStudentResponse>(
      `${this.url}/students/${id}`,
      { params }
    );
  }


  getStudentCourseAssisted(id: string): Observable<CourseWithoutStudents[]> {
    return this.http.get<CourseResponse[]>(
      `${this.url}/studentsAssistedCourses/${id}`
    );
  }


  getAssistanceSalon(
    courseId: string,
    page?: number,
    limit?: number,
    date?: Date
  ): Observable<CourseAssistanceResponse> {
    const params = new HttpParams({
      fromObject: {
        ...(page && { page: page.toString() }),
        ...(limit && { limit: limit.toString() }),
        ...(date && { date: DateToString(date) }),
      },
    });

    return this.http.get<CourseAssistanceResponse>(
      `${this.url}/course/${courseId}`,
      { params }
    );
  }

  getHistorialAssistances(
    queryParms?: QueryParamsHistorialAssistance
  ): Observable<DataHistorial[]> {
    if (queryParms) {
      const { courseId, date, startDate, endDate } = queryParms;
      const params = new HttpParams({
        fromObject: {
          ...(courseId && { courseId }),
          ...(date && { date: DateToString(date) }),
          ...(startDate && { startDate: DateToString(startDate) }),
          ...(endDate && { endDate: DateToString(endDate) }),
        },
      });
      return this.http
        .get<HistorialAssistanceResponse>(`${this.url}/historial`, { params })
        .pipe(map((v) => v.data));
    }

    return this.http
      .get<HistorialAssistanceResponse>(`${this.url}/historial`)
      .pipe(map((v) => v.data));
  }

  getAssistanceSumary(
    queryAssisSumary?: QueryAssistanceSumary
  ): Observable<AssistanceSummaryResponse> {
    if (!queryAssisSumary) {
      return this.http.get<AssistanceSummaryResponse>(
        `${this.url}/historial/all`
      );
    }
    if (!queryAssisSumary.rangeDate) {
      return this.http.get<AssistanceSummaryResponse>(
        `${this.url}/historial/all`
      );
    }
    const rangeDate: RangeDate = queryAssisSumary.rangeDate;
    const params = new HttpParams({
      fromObject: {
        startDate: DateToString(rangeDate.startDate),
        endDate: DateToString(rangeDate.endDate),
      },
    });

    return this.http.get<AssistanceSummaryResponse>(
      `${this.url}/historial/all`,
      { params }
    );
  }
}
