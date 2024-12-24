import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { StudentsTableComponent } from '../../components/student-page/students-table/students-table.component';
import { AddStudentFormComponent } from '../../components/forms/add-student-form/add-student-form.component';
import { UpdateStudentFormComponent } from '../../components/forms/update-student-form/update-student-form.component';
import { WarningDeleteComponent } from '../../components/forms/warning-delete/warning-delete.component';

import { TwoPersonsSvg } from '../../svg/student-page/two-persons-svg.component';

import { StudentsService } from '@core/services/student/students.service';
import { StudentsResponse } from '@core/services/student/interfaces/response/StudentsResponse.interface';

import { CardStatisticsComponent } from '@shared/components/card-statistics/card-statistics.component';
import { FilterTableComponent } from '@shared/components/filter-table/filter-table.component';
import { ModalComponent } from '@shared/components/modal/modal.component';

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
    AddStudentFormComponent,
    UpdateStudentFormComponent,
    WarningDeleteComponent,
    //shared components
    CardStatisticsComponent,
    FilterTableComponent,
    ModalComponent,
  ],
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentPageComponent implements OnInit {
  public studentId: number = 0;
  public activeModal: 'add' | 'update' | 'delete' | null = null;

  protected pageSize: number = 50;
  protected page: number = 1;
  protected pageIndex = this.page - 1;

  public studentsResponse$!: Observable<StudentsResponse>;

  OnClickUpdate(id: number) {
    this.studentId = id;
    this.activeModal = 'update';
  }

  OnClickDelete(id: number) {
    this.studentId = id;
    this.activeModal = 'delete';
  }

  OnClickAdd() {
    this.activeModal = 'add';
  }

  closeModal() {
    this.activeModal = null;
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
