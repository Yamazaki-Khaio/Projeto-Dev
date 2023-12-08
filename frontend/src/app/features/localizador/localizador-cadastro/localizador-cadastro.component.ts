//component em construção


import { Component } from '@angular/core';

@Component({
  selector: 'app-localizador-cadastro',
  templateUrl: './localizador-cadastro.component.html',
  styleUrls: ['./localizador-cadastro.component.scss']
})
export class LocalizadorCadastroComponent {
  alertMessage: string | null = null;
  exibirInputTelefone: boolean = false;
  exibirModalEndereco: boolean = false;

  fecharAlerta() {
    this.alertMessage = null;
  }

  adicionarEmail() {
    // Implemente a lógica para adicionar um email
    this.alertMessage = 'Email adicionado com sucesso.';
  }

  adicionarEndereco() {
    // Implemente a lógica para adicionar um endereço
    this.alertMessage = 'Endereço adicionado com sucesso.';
  }

  adicionarTelefone() {
    // Implemente a lógica para adicionar um número de telefone
    this.alertMessage = 'Número de telefone adicionado com sucesso.';
  }

  estaAccordionAberto(indice: number): boolean {
    // Implemente a lógica para verificar se o accordion no índice fornecido está aberto
    // Substitua pela sua implementação real
    return true;
  }

  alternarAccordion(indice: number) {
    // Implemente a lógica para alternar o estado do accordion no índice fornecido
    // Este é apenas um marcador de posição, você precisa lidar com o estado dos seus accordions
    console.log(`Accordion ${indice} alternado`);
  }

  abrirModalEndereco(): void {
    this.exibirModalEndereco = true;
    // Implemente a lógica para abrir o modal de endereço
    console.log('Modal de Endereço Aberto');
  }

  abrirInputTelefone(): void {
    this.exibirInputTelefone = true;
    // Implemente a lógica para abrir o input de telefone
    console.log('Input de Telefone Aberto');
  }

  abrirModalBootstrap(): void {
    // Implemente a lógica para abrir o modal do Bootstrap
    console.log('Modal do Bootstrap Aberto');
  }
}
