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
setSituacao(arg0: string) {
throw new Error('Method not implemented.');
}
  clienteEditForm!: FormGroup;
  clienteId!: number;

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
          inputNome: [cliente.nome, [Validators.required]],
          inputIdentificacao: [cliente.identificacao],
          inputRef: [cliente.nome_ref, [Validators.required]],
          inputInscricaoMunicipal: [cliente.inscricao_municipal],
          inputInscricaoEstadual: [cliente.inscricao_estadual],
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
      nome: this.clienteEditForm.value.inputNome,
      identificacao: this.clienteEditForm.value.inputIdentificacao,
      nome_ref: this.clienteEditForm.value.inputRef,
      inscricao_municipal: this.clienteEditForm.value.inputInscricaoMunicipal,
      inscricao_estadual: this.clienteEditForm.value.inputInscricaoEstadual,
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
}
