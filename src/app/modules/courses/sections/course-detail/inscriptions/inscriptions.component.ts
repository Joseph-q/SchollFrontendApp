import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
  signal,
} from '@angular/core';

import { Observable } from 'rxjs';

import { StudentsResponse } from '@core/services/student/interfaces/response/StudentsResponse.interface';
import { StudentsService } from '@core/services/student/students.service';
import {
  StudentsTableComponent,
  StudentTableColumnRef,
  StudentTableColums,
} from '@students/components/student-page/students-table/students-table.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-inscriptions',
  standalone: true,
  imports: [StudentsTableComponent, AsyncPipe],
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss',
})
export class InscriptionsComponent {
  protected studentService: StudentsService = inject(StudentsService);
  protected dataSource!: Observable<StudentsResponse>;

  @Input({ transform: numberAttribute }) set id(courseId: number) {
    this.dataSource = this.studentService.getStudents(
      1,
      25,
      undefined,
      courseId.toString()
    );
  }

  studentTableColumns: StudentTableColums[] = [
    {
      columName: 'Nombre',
      columRef: StudentTableColumnRef.Name,
      columData: ['name', 'lastname'],
    },
    {
      columName: 'Email',
      columRef: StudentTableColumnRef.Email,
      columData: ['email'],
    },
    {
      columName: 'Numero',
      columRef: StudentTableColumnRef.Number,
      columData: ['number'],
    },
  ];
}
