import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() cancelledBtnType: string = 'danger';
  @Input() confirmedBtnType: string = 'valid';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm() {
    this.confirmed.emit();
    this.isVisible = false;
  }

  cancel() {
    this.cancelled.emit();
    this.isVisible = false;
  }
}
