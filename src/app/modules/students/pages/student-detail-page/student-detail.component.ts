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
  signal,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { CardStudentComponent } from '@students/components/student-detail/card-student/card-student.component';

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
  protected studentId = signal('');
  @Input() set id(studentId: string) {
    this.studentId.set(studentId);
  }
}
