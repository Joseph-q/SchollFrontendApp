import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification-error',
  standalone: true,
  templateUrl: './notification-error.component.html',
  styleUrl: './notification-error.component.scss'
})
export class NotificationErrorComponent {

  @Input({ required: true }) message: string = 'Alumno eliminado';

  @Output() onclick = new EventEmitter<void>();

  constructor() {}

  onClickNotification() {
    this.onclick.emit()
  }
}
