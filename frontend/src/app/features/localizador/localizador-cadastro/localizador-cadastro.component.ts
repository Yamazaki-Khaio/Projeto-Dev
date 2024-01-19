import { Component, EventEmitter, SimpleChanges } from '@angular/core';
import { IconsService } from '../../../shared/util/icons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnderecoCadastroComponent } from '../endereco-cadastro/endereco-cadastro.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { EmailService } from '../email.service';
import { TelefoneService } from '../telefone.service';
import { EnderecoService } from '../endereco.service';
import { Observable, Subscription } from 'rxjs';

//refatorar para novo modelo usando os utilitarios e services

// implementar o cancelar para dar rollback nos dados adicionados e não salvar nada
// implementar o submit para commitar os dados adicionados e salvar tudo
// o voltar para voltar para a tela de perfil do cliente

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
  enderecoData$!: Observable<any[]>;
  telefoneData$!: Observable<any[]>;
  emailData$!: Observable<any[]>;
  private dataSubscription: Subscription = new Subscription();
  accordionItems: boolean[] = [false, false, false]; // Inicialmente todos os itens estão fechados
  isOpenEndereco: boolean = true;
  isOpenTelefone: boolean = true;
  isOpenEmail: boolean = true;

  toggleAccordion(section: string) {
    switch (section) {
      case 'endereco':
        this.isOpenEndereco = !this.isOpenEndereco;
        break;
      case 'telefone':
        this.isOpenTelefone = !this.isOpenTelefone;
        break;
      case 'email':
        this.isOpenEmail = !this.isOpenEmail;
        break;
      // Adicione mais casos conforme necessário
    }
  }

  constructor( private IconsService: IconsService, private router: Router, private modalService: NgbModal,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private enderecoService: EnderecoService,
    private telefoneService: TelefoneService,
    private emailService: EmailService,
    ) { }

  ngOnInit(): void {
    this.pessoaId = this.route.snapshot.params['id'];
    this.openedIconUrl = this.IconsService.getIconUrl('icon-obrigatorio');
    this.upIconUrl = this.IconsService.getIconUrl("down");
    this.atualizarDados();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  toggleAccordionItem(index: number): void {
    this.accordionItems[index] = !this.accordionItems[index];
  }

  abrirInput(tipo: 'telefone' | 'email'): void {
    if (tipo === 'telefone') {
      this.exibirTelefone = !this.exibirTelefone;
      this.exibirEmail = false;
    } else if (tipo === 'email') {
      this.exibirEmail = !this.exibirEmail;
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
      modalRef.componentInstance.enderecoAdicionado.subscribe((enderecoAdicionado: any) => {
        this.atualizarDados();
        this.alertService.showAlert('Endereço adicionado com sucesso.', 'alert-primary');
        console.log('Endereço adicionado: ' + enderecoAdicionado);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pessoaId']) {
      this.atualizarDados();
    }
  }

  voltar() {
    this.router.navigate(['users/profile/cliente/']);
  }

  OnSubmit() {
    this.router.navigate(['users/profile/cliente/']);
  }
  //refatorar para novo modelo usando os utilitarios e services
  private atualizarDados(): void {
    this.telefoneData$ = this.telefoneService.getTelefonesPorUsuario(this.pessoaId);
    this.enderecoData$ = this.enderecoService.getEnderecosPorUsuario(this.pessoaId);
    this.emailData$ = this.emailService.getEmailsPorUsuario(this.pessoaId);
  }

  handleEmailAdicionado($event: any) {
    this.atualizarDados();
    if ($event === 'cancelado') {
      this.exibirEmail = false;
    }
    console.log('E-mail adicionado: ' + $event);
    }


  handleTelefoneAdicionado($event: any) {
    this.atualizarDados();
    if ($event === 'cancelado') {
      this.exibirTelefone = false;
    }

    console.log('Telefone adicionado: ' + $event);
  }

}
