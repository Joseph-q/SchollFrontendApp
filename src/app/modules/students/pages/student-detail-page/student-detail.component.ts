import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Component, Input } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CardStudentComponent } from '../../components/student-detail/card-student/card-student.component';




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

  @Input() set id(studentId: string) {
    this.studentId = studentId;
  }
  ShowupdateForm: boolean = false;
  ShowDeleteForm: boolean = false;
  constructor(private router: Router) {}

  OnDeleteStudent() {
    this.router.navigate(['students']);
  }

  drawerExpanded: boolean = false;

  toggleDrawer() {
    this.drawerExpanded = !this.drawerExpanded;
  }

  isLinkActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
