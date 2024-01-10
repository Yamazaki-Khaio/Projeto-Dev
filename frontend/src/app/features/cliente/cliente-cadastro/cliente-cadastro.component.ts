import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { IconsService } from '../../../shared/util/icons.service';
import { NomeRefService } from '../../../shared/util/att-nome-ref.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss'],
  providers: [NgbAlertConfig] // add NgbAlertConfig to the component providers
})
export class ClienteCadastroComponent implements OnInit {

  clienteForm: FormGroup = new FormGroup({});
  emailError: string = 'Digite um CNPJ/CPF válido';
  nomeError: string = 'Insira um nome para seu cliente';
  openIconUrl: string = '';
  alertType: string = 'info';
  alertMessage: string = '';


  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private IconsService: IconsService,
    public nomeRefService: NomeRefService,
    private alertConfig: NgbAlertConfig,
    private activatedRoute: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.openIconUrl = this.IconsService.getIconUrl('icon-obrigatorio');
    this.clienteForm = this.fb.group({
      inputIdentificacao: ['', [Validators.required]],
      inputNome: ['', [Validators.required]],
      inputRef: ['', [Validators.required]],
    });

    this.clienteForm.get('inputIdentificacao')!.valueChanges.subscribe(value => {
      this.atualizarNomeRef(value);
    });

  }


  private atualizarNomeRef(valor: string) {
    this.nomeRefService.atualizarNomeRef(valor);
  }


  OnSubmit(): void {
    if (this.clienteForm.valid) {
      const cliente: Cliente = {
        identificacao: this.clienteForm.value.inputIdentificacao,
        nome: this.clienteForm.value.inputNome,
        nome_ref: this.clienteForm.value.inputRef,
      };

      this.clienteService.createCliente(cliente).subscribe(
        (data: Cliente) => {
          console.log(data);
          this.clienteForm.reset();
          this.router.navigate(['/profile/cliente/editar/' + data.id]);
          this.alertConfig.dismissible = true;
          this.alertConfig.type = 'success';
          this.alertMessage = 'Cliente adicionado com sucesso.';
          alertMessage: 'Cliente adicionado com sucesso.';
        },
        (error: any) => {
          console.log(cliente);
          console.log(error);
          this.alertConfig.dismissible = true;
          this.alertConfig.type = 'danger';
          this.alertMessage = 'Erro ao adicionar cliente. Erro: ' + error;
          // Aciona o alerta usando a API do NgBootstrap
          // this.ngbAlert.close(); // Fecha o alerta se estiver aberto
          // this.ngbAlert.type = 'danger';
          // this.ngbAlert.dismissible = true;
          // this.ngbAlert.open('Erro ao adicionar cliente. Erro: ' + error);

        }
      );
    } else {
      console.log('Erro no formulário. Verifique os campos.');
    }
  }

  voltar() {
    this.router.navigate(['users/profile/cliente/']);
  }



}
