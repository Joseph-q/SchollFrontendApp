import { AsyncPipe, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  model,
  OnDestroy,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { filter, map, Observable, of, Subject, takeUntil, tap } from 'rxjs';

import {
  StudentsQueryResponse,
  StudentsResponse,
} from '@core/services/student/interfaces/response/StudentsResponse.interface';
import { StudentsService } from '@core/services/student/students.service';
import MetadataPage from '@shared/interfaces/Metadata.constant';
import { StudentResponse } from '@core/services/student/interfaces/response/StudentResponse.interface';

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
    AsyncPipe,
  ],
})
export class StudentsTableComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  private studentService: StudentsService = inject(StudentsService);
  private router: Router = inject(Router);


  //Table Structure
  @Input()
  set colums(value: StudentTableColums[]) {
    this.ColumsToShow = value;
    this.displayedColumns = value.map((v) => v.columRef);
  }
  protected ColumsToShow: StudentTableColums[] = [
    {
      columName: 'Registrado',
      columRef: StudentTableColumnRef.Created,
      columData: [],
    },
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

    {
      columName: 'ACTIONS',
      columRef: StudentTableColumnRef.Actions,
      columData: [],
    },
  ];
  protected displayedColumns = this.ColumsToShow.map((v) => v.columRef);

  //Table Data
  @Input({
    transform: (v: StudentsResponse | Observable<StudentsResponse>) => {
      if (v instanceof Observable) {
        return v;
      }
      return of(v);
    },
  })
  datasource: Observable<StudentsResponse> | null = null;

  pageSize = signal(10);
  pageIndex = signal(0);
  totalItems = signal(100);
  orderBy = signal('');
  private courseId = signal('');

  @Output() updateStudent = new EventEmitter<number>();
  @Output() deleteStudent = new EventEmitter<number>();

  @ViewChild(MatSort) sort!: MatSort;

  protected isLoadingResults = false;
  private unsubscribe$ = new Subject<void>();

  //Actions
  protected OnClickUpdate(id: number) {
    this.updateStudent.emit(id);
  }

  protected OnClickDelete(id: number) {
    this.deleteStudent.emit(id);
  }

  protected OnclickRow(studentId: number) {
    this.router.navigate(['students', studentId, 'assistances']);
  }

  public handlePageEvent(e: PageEvent) {
    this.datasource = this.studentService
      .getStudents(e.pageIndex + 1, e.pageSize, this.orderBy())
      .pipe(tap((v) => this.handleData(v)));
  }

  private handleQueryParams(queryParams: StudentsQueryResponse) {
    const { courseId } = queryParams;
    this.courseId.set(courseId);
  }

  private handleMetadataPage(metadata: MetadataPage) {
    const { page, pageSize, total } = metadata;
    this.pageSize.set(pageSize);
    this.pageIndex.set(page - 1);
    this.totalItems.set(total);
  }

  private normalizeSort(sort: Sort): string {
    return (
      sort.active +
      sort.direction.charAt(0).toUpperCase() +
      sort.direction.slice(1)
    );
  }

  private handleData(response: StudentsResponse) {
    this.handleMetadataPage(response.metadata);
    this.handleQueryParams(response.queryParams);
  }

  ngOnInit(): void {
    if (this.datasource != null) {
      this.datasource = this.datasource.pipe(tap((v) => this.handleData(v)));
      return;
    }

    this.datasource = this.studentService
      .getStudents()
      .pipe(tap((v) => this.handleData(v)));
  }

  ngAfterViewInit(): void {
    this.sort.sortChange
      .pipe(
        takeUntil(this.unsubscribe$),
        map((sortValue) => {
          this.isLoadingResults = true;
          return this.normalizeSort(sortValue); //createdDesc | createdAsc
        }),
        tap((v: string) => this.orderBy.set(v)),
        filter(() => {
          if (this.pageSize() >= this.totalItems()) {
            this.datasource = this.datasource!.pipe(
              map((v) => {
                return {
                  ...v,
                  data: [...v.data].reverse(),
                };
              })
            );
            this.isLoadingResults = false;
            return false;
          }
          return true;
        })
      )
      .subscribe((orderBy: string) => {
        this.datasource = this.studentService
          .getStudents(
            this.pageIndex() + 1,
            this.pageSize(),
            orderBy,
            this.courseId()
          )
          .pipe(tap((v) => this.handleData(v)));
        this.isLoadingResults = false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
