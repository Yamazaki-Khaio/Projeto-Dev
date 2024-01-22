import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-confirmed',
  templateUrl: './dialog-confirmed.component.html',
  styleUrls: ['./dialog-confirmed.component.scss']
})
export class DialogConfirmedComponent {
  @Input() modalTitle!: string;
  @Input() modalBodyText!: string;
  @Input() modalButtonText!: string;
  @Input() modalButtonClass!: string;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSaveChanges = new EventEmitter<void>();

  constructor(public activeModal: NgbActiveModal) {
  this.modalBodyText = ' Você tem certeza que deseja excluir? Os registros excluídos não poderão ser restaurados.'

  }

  closeModal(): void {
    this.onClose.emit();
    this.activeModal.dismiss();
  }

  saveChanges(): void {
    this.onSaveChanges.emit();
    this.activeModal.close();
  }
}
