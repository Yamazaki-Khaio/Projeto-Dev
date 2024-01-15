import { Component } from '@angular/core';
import { IconsService } from '../../../shared/util/icons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnderecoCadastroComponent } from '../endereco-cadastro/endereco-cadastro.component';

//refatorar para novo modelo usando os utilitarios


@Component({
  selector: 'app-localizador-cadastro',
  templateUrl: './localizador-cadastro.component.html',
  styleUrls: ['./localizador-cadastro.component.scss']
})
export class LocalizadorCadastroComponent {

  alertMessage: string | null = null;
  openedIconUrl: string = '';
  upIconUrl: string = '';
  pessoaId!: string;
  exibirTelefone: boolean = false;
  exibirEmail: boolean = false;

  constructor(
    private IconsService: IconsService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.pessoaId = this.route.snapshot.params['id'];
    this.openedIconUrl = this.IconsService.getIconUrl('icon-obrigatorio');
    this.upIconUrl = this.IconsService.getIconUrl("down");

  }

  fecharAlerta() {
    this.alertMessage = null;
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

  abrirInputTelefone(): void {
    if (this.exibirTelefone) {
      // Se o input de telefone já estiver aberto, feche-o
      this.exibirTelefone = false;
    } else {
      // Se não estiver aberto, abra-o e feche o input de e-mail se estiver aberto
      this.exibirTelefone = true;
      this.exibirEmail = false;
    }
  }

  abrirInputEmail(): void {
    if (this.exibirEmail) {
      // Se o input de e-mail já estiver aberto, feche-o
      this.exibirEmail = false;
    } else {
      // Se não estiver aberto, abra-o e feche o input de telefone se estiver aberto
      this.exibirEmail = true;
      this.exibirTelefone = false;
    }
  }


  abrirModalBootstrap(): void {
    // Implemente a lógica para abrir o modal do Bootstrap
    const modalRef = this.modalService.open(EnderecoCadastroComponent, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    }
    );
    modalRef.shown.subscribe(() => {
      modalRef.componentInstance.pessoaId = this.pessoaId;
      console.log('Modal do Bootstrap Aberto');
    });
  }


  voltar() {
    this.router.navigate(['users/profile/cliente/']);
  }

  OnSubmit() {
    this.router.navigate(['users/profile/cliente/']);
  }

  handleEmailAdicionado($event: any) {
    throw new Error('Method not implemented.');
    }

}
