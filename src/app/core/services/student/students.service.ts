import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
//Responses
import { SearchStudentResponse } from './interfaces/response/SearchStudent.interface';
import { StudentsResponse } from './interfaces/response/StudentsResponse.interface';
import { StudentResponse } from './interfaces/response/StudentResponse.interface';
import { CreateStudentRequest } from './interfaces/request/CreateStudentRequest.interface';
import { UpdateStudentRequest } from './interfaces/request/UpdateStudent.Interface';
import { NotificationService } from '@core/services/notification/notification.service';
import { QuerySearchStudent } from '@core/services/student/interfaces/request/SearchStudentQuery.interface';

//Request

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private url = 'http://localhost:8080/students';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}
  private updateTrigger$ = new BehaviorSubject<void>(undefined); // Disparador de actualizaciones

  // Obtener todos los estudiantes
  getStudents(
    page?: number,
    limit?: number,
    order?: string,
    courseId?:string
  ): Observable<StudentsResponse> {
    const params = new HttpParams({
      fromObject: {
        ...(page && { page: page.toString() }),
        ...(limit && { limit: limit.toString() }),
        ...(order && { orderBy: order }),
        ...(courseId && { courseId: courseId }),

      },
    });

    return this.updateTrigger$.pipe(
      switchMap(() =>
        this.http.get<StudentsResponse>(`${this.url}`, { params })
      )
    );
  }

  searchStudent(
    query: string,
    queryParams?: QuerySearchStudent
  ): Observable<SearchStudentResponse> {
    let params = new HttpParams().set('query', query);

    if (queryParams) {
      params = params.set('limit', queryParams.limit);
      const searchValues = queryParams.searchValues;

      if (searchValues.email) {
        params = params.set('email', searchValues.email);
      } else if (searchValues.number) {
        params = params.set('number', searchValues.number);
      } else if (searchValues.name) {
        params = params.set('name', searchValues.name);
      }
    }

    return this.http.get<SearchStudentResponse>(`${this.url}/search`, {
      params,
    });
  }

  // Obtener un estudiante por ID
  getStudent(id: string, courseId?: string): Observable<StudentResponse> {
    const params = new HttpParams({
      fromObject: {
        ...(courseId && { courseId: courseId }),
      },
    });
    return this.updateTrigger$.pipe(
      switchMap(() =>
        this.http.get<StudentResponse>(`${this.url}/${id}`, { params })
      )
    );
  }

  // Crear un nuevo estudiante
  createStudent(newStudent: CreateStudentRequest): Observable<null> {
    return this.http.post<null>(`${this.url}`, newStudent).pipe(
      tap({
        complete: () => {
          this.triggerUpdate();
          this.notificationService.sendCompleteMessage(
            'Estudiante Creado Correctamente!!'
          );
        },
      })
    );
  }

  // Actualizar un estudiante existente
  updateStudent(
    id: string,
    updatedStudent: UpdateStudentRequest
  ): Observable<null> {
    return this.http.put<null>(`${this.url}/${id}`, updatedStudent).pipe(
      tap({
        complete: () => {
          this.triggerUpdate();
          this.notificationService.sendCompleteMessage(
            'Estudiante Actualizado Correctamente!!'
          );
        },
      })
    );
  }

  // Eliminar un estudiante por ID
  deleteStudent(id: string): Observable<null> {
    return this.http.delete<null>(`${this.url}/${id}`).pipe(
      tap({
        complete: () => {
          this.triggerUpdate();
          this.notificationService.sendCompleteMessage(
            'Estudiante Borrado Correctamente!!'
          );
        },
      })
    );
  }

  triggerUpdate(): void {
    this.updateTrigger$.next();
  }
}
