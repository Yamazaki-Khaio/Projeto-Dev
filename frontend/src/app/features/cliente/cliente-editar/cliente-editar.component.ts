import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { IconsService } from '../../../shared/util/icons.service';
import { NomeRefService } from '../../../shared/util/att-nome-ref.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.scss'],
  // providers: [IconsService]

})
export class ClienteEditarComponent implements OnInit {
  clienteEditForm!: FormGroup;
  clienteId!: number;
  alertMessage?: string;
  situacao!: string;
  openedIconUrl: string = '';


  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private iconsService: IconsService,
    public nomeRefService: NomeRefService,
    private alertService: AlertService,
  ) { }
  onSituacaoChange(novaSituacao: string) {
    this.situacao = novaSituacao;
    this.clienteEditForm.patchValue({ situacao: novaSituacao });
  }


  ngOnInit(): void {
    this.openedIconUrl = this.iconsService.getIconUrl("icon-obrigatorio");
    this.clienteId = this.route.snapshot.params['id'];

    this.clienteService.getCliente(this.clienteId.toString()).subscribe(
      (cliente: Cliente) => {
        this.situacao = cliente.situacao!;
        this.clienteEditForm = this.fb.group({
          nome: [cliente.nome, [Validators.required]],
          identificador: [cliente.identificacao],
          nome_ref: [cliente.nome_mae || cliente.nome_fantasia, [Validators.required]],
          inscricao_municipal: [cliente.inscricao_municipal],
          inscricao_estadual: [cliente.inscricao_estadual],
          data_cadastro: [cliente.data_cadastro],
          situacao: [cliente.situacao],
        });
        this.nomeRefService.atualizarNomeRef(cliente.identificacao!);

      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  onSubmit(): void {

    const cliente: Cliente = {
      id: this.clienteId,
      identificacao: this.clienteEditForm.value.identificador,
      nome: this.clienteEditForm.value.nome,
      nome_ref: this.clienteEditForm.value.nome_ref,
      inscricao_municipal: this.clienteEditForm.value.inscricao_municipal,
      inscricao_estadual: this.clienteEditForm.value.inscricao_estadual,
      situacao: this.clienteEditForm.value.situacao,
    };
    this.clienteService.updateCliente(cliente).subscribe(
      (data: Cliente) => {
        console.log(data);
        console.log(cliente);
        this.alertService.showAlert('Cliente atualizado com sucesso!', 'alert-primary');

      },
      (error: any) => {
        console.log(cliente);
        console.log(error);
        this.alertService.showAlert('Erro ao adicionar cliente!', 'alert-danger');
      }
    );
  }

  voltar() {
    this.router.navigate(['/profile/cliente']);
  }



}
