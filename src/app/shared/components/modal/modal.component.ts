import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() disableBackButton = false;

  OnCloseModal() {
    this.closeModal.emit();
  }
}
