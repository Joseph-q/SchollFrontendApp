import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Component, inject, Input } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CardStudentComponent } from '../../components/student-detail/card-student/card-student.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateStudentDialogComponent } from '@students/components/dialog/update-student-dialog/update-student-dialog.component';
import { DeleteDialogComponent } from '@students/components/dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [
    // Angular Material Modules
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    // Router Modules
    RouterOutlet,
    RouterLink,
    RouterLinkActive,

    // Custom Components
    CardStudentComponent,
  ],

  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent {
  studentId: string | null = null;
  readonly dialog = inject(MatDialog);

  @Input() set id(studentId: string) {
    this.studentId = studentId;
  }

  constructor(private router: Router) {}

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
  }

  drawerExpanded: boolean = false;

  toggleDrawer() {
    this.drawerExpanded = !this.drawerExpanded;
  }

  isLinkActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
