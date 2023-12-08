import { Component } from '@angular/core';

@Component({
  selector: 'app-localizador-cadastro',
  templateUrl: './localizador-cadastro.component.html',
  styleUrls: ['./localizador-cadastro.component.scss']
})
export class LocalizadorCadastroComponent {
  showTelefoneInput: boolean = false;
  showEnderecoModal: boolean = false;

  openEnderecoModal(): void {
    this.showEnderecoModal = true;
    this.openBootstrapModal(); // Implemente a lógica para abrir o modal do Bootstrap aqui
  }

  openTelefoneInput(): void {
    this.showTelefoneInput = true;
  }

  openBootstrapModal(): void {
    // Implemente a lógica para abrir o modal do Bootstrap aqui
  }
}
