import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  model,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { map, Observable, of, Subject, takeUntil, tap } from 'rxjs';


import { StudentFromStudents } from '@core/services/student/interfaces/response/StudentsResponse.interface';
import { StudentsService } from '@core/services/student/students.service';




@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrl: './students-table.component.scss',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatPaginatorModule,
  ],
})
export class StudentsTableComponent implements AfterViewInit, OnDestroy {
  pageSize = model(10);
  pageIndex = model(0);
  totalItems = model(100);
  orderBy = model('');

  @Input({ transform: (v: StudentFromStudents[]) => of(v) })
  datasource!: Observable<StudentFromStudents[]>;
  @Input()
  set colums(value: StudentTableColums[]) {
    this.ColumsToShow = value;
    this.displayedColumns = value.map((v) => v.columRef);
  }

  @Output() updateStudent = new EventEmitter<number>();
  @Output() deleteStudent = new EventEmitter<number>();

  @ViewChild(MatSort) sort!: MatSort;

  protected ColumsToShow: StudentTableColums[] = [
    {
      columName: 'REGISTRADO',
      columRef: StudentTableColumnRef.Created,
      columData: [],
    },
    {
      columName: 'NOMBRE',
      columRef: StudentTableColumnRef.Name,
      columData: ['name', 'lastname'],
    },
    {
      columName: 'NUMBERO',
      columRef: StudentTableColumnRef.Number,
      columData: ['number'],
    },
    {
      columName: 'EMAIL',
      columRef: StudentTableColumnRef.Email,
      columData: ['email'],
    },

    {
      columName: 'ACTIONS',
      columRef: StudentTableColumnRef.Actions,
      columData: [],
    },
  ];

  protected displayedColumns = this.ColumsToShow.map((v) => v.columRef);
  protected isLoadingResults = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private studentService: StudentsService,
    private router: Router
  ) {}

  protected OnClickUpdate(id: number) {
    this.updateStudent.emit(id);
  }

  protected OnClickDelete(id: number) {
    this.deleteStudent.emit(id);
  }

  protected OnclickRow(studentId: number) {
    this.router.navigate(['students', studentId, 'assistances']);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange
      .pipe(
        takeUntil(this.unsubscribe$), // Unsubscribe when component destroyed
        tap((v) => {
          this.isLoadingResults = true;
          let orderBy =
            v.active +
            v.direction.charAt(0).toUpperCase() +
            v.direction.slice(1);

          this.orderBy.set(orderBy);

          if (this.pageSize() >= this.totalItems()) {
            this.datasource = this.datasource.pipe(
              map((data) => {
                this.isLoadingResults = false;
                return [...data].reverse(); // Copiar y luego invertir los datos
              })
            );
            this.isLoadingResults = false;
          } else {
            this.datasource = this.studentService
              .getStudents(this.pageIndex() + 1, this.pageSize(), orderBy)
              .pipe(
                map((v) => {
                  this.isLoadingResults = false;
                  return v.data;
                })
              );
          }
        })
      )
      .subscribe();
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);

    this.datasource = this.studentService
      .getStudents(this.pageIndex() + 1, this.pageSize(), this.orderBy())
      .pipe(
        tap((v) => this.totalItems.set(v.metadata.total)),
        map((v) => v.data)
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(); // Trigger unsubscribing on destroy
    this.unsubscribe$.complete(); // Complete the subject
  }
}

export interface StudentTableColums {
  columName: string;
  columRef: StudentTableColumnRef;
  columData: string[];
}

export enum StudentTableColumnRef {
  Created = 'created',
  Name = 'name',
  Number = 'number',
  Email = 'email',
  Actions = 'actions',
}
