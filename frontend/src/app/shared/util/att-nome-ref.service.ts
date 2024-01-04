import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NomeRefService {
  nome_ref: string = '';
  placeholder: string = '';
  mostrarDivInputRef: boolean = false;

  atualizarNomeRef(valor: string): void {
    const valorSemPontos = valor.replace(/\./g, '');
    this.mostrarDivInputRef = valorSemPontos.length === 11 || valorSemPontos.length === 14;

    switch (valorSemPontos.length) {
      case 11:
        this.nome_ref = 'Nome da mãe';
        this.placeholder = 'Insira o nome da mãe do cliente';
        break;
      case 14:
        this.nome_ref = 'Nome fantasia';
        this.placeholder = 'Insira o nome fantasia do CNPJ';
        break;
      default:
        this.nome_ref = '';
        this.placeholder = '';
        break;
    }
  }
}
