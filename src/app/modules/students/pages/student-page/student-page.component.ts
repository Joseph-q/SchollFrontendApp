import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { StudentsTableComponent } from '../../components/student-page/students-table/students-table.component';
import { TwoPersonsSvg } from '../../svg/student-page/two-persons-svg.component';

import { StudentsService } from '@core/services/student/students.service';
import { StudentsResponse } from '@core/services/student/interfaces/response/StudentsResponse.interface';

import { CardStatisticsComponent } from '@shared/components/card-statistics/card-statistics.component';
import { FilterTableComponent } from '@shared/components/filter-table/filter-table.component';
import { UpdateStudentDialogComponent } from '../../components/dialog/update-student-dialog/update-student-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentDialogComponent } from '@students/components/dialog/add-student-dialog/add-student-dialog.component';
import { DeleteDialogComponent } from '@students/components/dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-student-page',
  standalone: true,
  imports: [
    //Angular
    AsyncPipe,
    MatButton,
    //own components
    StudentsTableComponent,
    TwoPersonsSvg,
    //shared components
    CardStatisticsComponent,
    FilterTableComponent,
  ],
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentPageComponent implements OnInit {
  public studentId: number = 0;
  readonly dialog = inject(MatDialog);


  protected pageSize: number = 50;
  protected page: number = 1;
  protected pageIndex = this.page - 1;

  public studentsResponse$!: Observable<StudentsResponse>;

  OnClickUpdate(id: number) {
    this.dialog.open(UpdateStudentDialogComponent, {
      data: { studentId: id },
    });
  }

  OnClickDelete(id: number) {
    this.dialog.open(DeleteDialogComponent, {
      data: { studentId: id },
    })
  }

  OnClickAdd() {
    this.dialog.open(AddStudentDialogComponent, {
    });
  }

  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {
    this.studentsResponse$ = this.studentService.getStudents(
      this.page,
      this.pageSize,
      'createdDesc'
    );
  }
}
