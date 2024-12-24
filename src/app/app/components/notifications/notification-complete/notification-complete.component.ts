import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification-complete',
  standalone: true,
  templateUrl: './notification-complete.component.html',
  styleUrl: './notification-complete.component.scss',
})
export class NotificationCompleteComponent {
  @Input({ required: true }) message: string = 'Alumno guardado';

  @Output() onclick = new EventEmitter<void>();

  onClickNotification() {
    this.onclick.emit();
  }
}
