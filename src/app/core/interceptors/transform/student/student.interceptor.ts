import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { PostReqStudent } from '@core/interceptors/transform/student/interfaces/PostStudents.interface';
import PutReqStudent from '@core/interceptors/transform/student/interfaces/PutStudent.interface';

import { CreateStudentRequest } from '@core/services/student/interfaces/request/CreateStudentRequest.interface';
import { UpdateStudentRequest } from '@core/services/student/interfaces/request/UpdateStudent.Interface';
import DateToString from '@shared/functions/format-date-to-string';

export const StudentInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  if (req.method == 'POST' && req.url.match('students') && req.body != null) {
    const modifiedRequest = req.clone({
      body: transformStudentCreate(req.body as CreateStudentRequest),
    });
    return next(modifiedRequest);
  }

  if (req.method == 'PUT' && req.url.match('students') && req.body != null) {
    const modifiedRequest = req.clone({
      body: transformStudentUpdate(req.body as UpdateStudentRequest),
    });
    return next(modifiedRequest);
  }

  return next(req);
};

const transformStudentCreate = (
  student: CreateStudentRequest
): PostReqStudent => {
  let newDate: string | null = null;
  if (student.birthday) {
    newDate = DateToString(student.birthday);
  }

  return {
    ...student,
    birthday: newDate,
  };
};

const transformStudentUpdate = (
  student: UpdateStudentRequest
): PutReqStudent => {
  let newDate: string | null = null;
  if (student.birthday) {
    newDate = DateToString(student.birthday);
  }
  return {
    ...student,
    birthday: newDate,
  };
};
