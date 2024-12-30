import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseDialogComponent } from '@home/dialog/add-course-dialog/add-course-dialog.component';
import { NavBarComponent } from '../../../../app/components/nav-bar/nav-bar.component';
import { NotificationService } from '@core/services/notification/notification.service';
import { Subscription } from 'rxjs';
import { NotificationCompleteComponent } from '../../../../app/components/notifications/notification-complete/notification-complete.component';
import { NotificationErrorComponent } from '../../../../app/components/notifications/notification-error/notification-error.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    SideBarComponent,
    NavBarComponent,
    NotificationCompleteComponent,
    NotificationErrorComponent,
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

  public completeMessages: { id: number; message: string }[] = [];
  public errorMessages: { id: number; message: string }[] = [];

  public Subs: Subscription[] = [];

  constructor(private notificationService: NotificationService) {
    this.Subs[0] = this.notificationService.completeSub.subscribe({
      next: (value) => {
        if (value.length >= 3) {
          const intervalId = setInterval(() => {
            if (value.length > 0) {
              this.notificationService.deleteTopMessageComplete();
            } else {
              clearInterval(intervalId); // Detiene el setInterval
            }
          }, 5000);
        } else {
          console.log('El array está vacío');
        }
        this.completeMessages = value;
      },
    });
    this.Subs[1] = this.notificationService.errorSub.subscribe({
      next: (value) => {
        if (value.length >= 3) {
          const intervalId = setInterval(() => {
            if (value.length > 0) {
              this.notificationService.deleteTopMessageError();
            } else {
              clearInterval(intervalId); // Detiene el setInterval
            }
          }, 5000);
        } else {
          console.log('El array está vacío');
        }

        this.errorMessages = value;
      },
    });
  }

  ngOnDestroy(): void {
    this.Subs[0].unsubscribe();
    this.Subs[2].unsubscribe();
  }

  onDestroyElementComplete(id: number) {
    this.notificationService.deleteMessageCompleteById(id);
  }

  onDestroyElementError(id: number) {
    this.notificationService.deleteMessageErrorById(id);
  }
}
