import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { StudentsService } from '@core/services/student/students.service';
import {
  StudentsTableComponent,
  StudentTableColumnRef,
  StudentTableColums,
} from '../../../../students/components/student-page/students-table/students-table.component';
import { StudentsResponse } from '@core/services/student/interfaces/response/StudentsResponse.interface';
import { Observable } from 'rxjs';
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
  protected dataSource: Observable<StudentsResponse> | null = null;

  studentTableColumns: StudentTableColums[] = [
    {
      columName: 'Registrado',
      columRef: StudentTableColumnRef.Created,
      columData: ['name', 'lastname'],
    },
    {
      columName: 'NOMBRE',
      columRef: StudentTableColumnRef.Name,
      columData: ['name', 'lastname'],
    },
    {
      columName: 'EMAIL',
      columRef: StudentTableColumnRef.Email,
      columData: ['email'],
    },
    {
      columName: 'NUMERO',
      columRef: StudentTableColumnRef.Number,
      columData: ['number'],
    },
   
  ];

  @Input({ transform: numberAttribute }) set id(courseId: number) {
    this.dataSource = this.studentService.getStudents(
      1,
      20,
      undefined,
      courseId.toString()
    );
  }
}
