// situacao.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsService } from '../../util/icons.service';

@Component({
  selector: 'app-situacao',
  templateUrl: './situacao.component.html',
  styleUrls: ['./situacao.component.scss'],
  providers: [IconsService]
})
export class SituacaoComponent {
  @Input() situacaoFromForm: string = '';
  @Output() situacaoChange = new EventEmitter<string>();
  isDropdownOpen: boolean = false;
  openedIconUrl: string = '';
  closedIconUrl: string = '';

  constructor(private iconsService: IconsService) {
    this.loadIcons();
  }

  onOptionSelect(option: string): void {
    this.situacaoFromForm = option;
    this.situacaoChange.emit(option);
    this.toggleDropdown();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  loadIcons() {
    this.openedIconUrl = this.iconsService.getIconUrl('up');
    this.closedIconUrl = this.iconsService.getIconUrl('down');
    // Adicione outros ícones conforme necessário
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
