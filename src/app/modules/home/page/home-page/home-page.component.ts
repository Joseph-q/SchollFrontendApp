import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseDialogComponent } from '@home/dialog/add-course-dialog/add-course-dialog.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    SideBarComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  readonly dialog = inject(MatDialog);
  OpenDialog(): void {
    this.dialog.open(AddCourseDialogComponent, {
      width: '40%',
    });
  }
}
