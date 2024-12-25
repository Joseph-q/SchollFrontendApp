import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  Input,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { UpdateStudentDialogComponent } from '@students/components/dialog/update-student-dialog/update-student-dialog.component';
import { CardStudentComponent } from '@students/components/student-detail/card-student/card-student.component';
import { DeleteDialogComponent } from '@students/components/dialog/delete-dialog/delete-dialog.component';

import { FilterTableComponent } from '@shared/components/filter-table/filter-table.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Location } from '@angular/common';
@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [
    //Material
    MatButtonToggleModule,
    // Router Modules
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    // Custom Components
    CardStudentComponent,
    //Shared
    FilterTableComponent,
  ],

  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentDetailComponent {
  protected studentId: string | null = null;
  protected drawerExpanded: boolean = false;
  readonly dialog = inject(MatDialog);

  @Input() set id(studentId: string) {
    this.studentId = studentId;
  }

  constructor(private location: Location) {}

  OnUpdateStudent() {
    this.dialog.open(UpdateStudentDialogComponent, {
      data: {
        studentId: this.studentId,
      },
    });
  }

  OnDeleteStudent() {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        studentId: this.studentId,
      },
    });

    this.location.back()
  }

  toggleDrawer() {
    this.drawerExpanded = !this.drawerExpanded;
  }

}
