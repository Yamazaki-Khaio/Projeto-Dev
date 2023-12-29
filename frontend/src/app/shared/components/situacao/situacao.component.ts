// situacao.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-situacao',
  templateUrl: './situacao.component.html',
  styleUrls: ['./situacao.component.scss']
})
export class SituacaoComponent {
  @Input() situacaoFromForm: string = '';
  isDropdownOpen: boolean = false;

  onOptionSelect(option: string): void {
    this.situacaoFromForm = option;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getButtonClass(): string {
    if (this.situacaoFromForm === 'Ativo') {
      return 'btn-success';
    } else if (this.situacaoFromForm === 'Inativo') {
      return 'btn-warning';
    } else if (this.situacaoFromForm === 'Negativado') {
      return 'btn-danger';
    } else {
      return 'btn-secondary';
    }
  }
}
