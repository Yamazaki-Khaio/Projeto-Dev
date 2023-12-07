import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.scss']
})
export class ClienteEditarComponent implements OnInit {
  clienteEditForm!: FormGroup;
  clienteId!: number;
  alertMessage?: string;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clienteId = this.route.snapshot.params['id'];
    this.clienteService.getCliente(this.clienteId.toString()).subscribe(
      (cliente: Cliente) => {
        this.clienteEditForm = this.fb.group({
          nome: [cliente.nome, [Validators.required]],
          identificador: [cliente.identificacao],
          nome_ref: [cliente.nome_ref, [Validators.required]],
          inscricao_municipal: [cliente.inscricao_municipal],
          inscricao_estadual: [cliente.inscricao_estadual],
          situacao: [cliente.situacao],
          data_cadastro: [cliente.data_cadastro] // Adicionando o campo de Situação
        });
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
        this.router.navigate(['/profile/cliente']);
      },
      (error: any) => {
        console.log(cliente);
        console.log(error);
      }
    );
  }

  voltar() {
    this.router.navigate(['/profile/cliente']);
  }

  // Adicionando a lógica para fechar o alerta
  closeAlert(): void {
    this.alertMessage = undefined;
  }

  // Adicionando a lógica para obter a cor da Situação
  getColorForSituacao(): string {
    const situacao = this.clienteEditForm.get('inputSituacao')?.value;

    switch (situacao) {
      case 'Ativo':
        return 'green';
      case 'Inativo':
        return 'yellow';
      case 'Negativado':
        return 'red';
      default:
        return '';
    }
  }
}
