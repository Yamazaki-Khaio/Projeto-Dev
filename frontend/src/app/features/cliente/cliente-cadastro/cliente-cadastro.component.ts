// cliente-cadastro.component.ts

import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss'],
})
export class ClienteCadastroComponent implements OnInit {

  clienteForm: FormGroup = new FormGroup({});


  constructor(private fb: FormBuilder, private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required]],
      identificacao: ['', [Validators.required]],
      nome_ref: ['', [Validators.required]],
    });



  }




  OnSubmit() {

    // Criar um objeto cliente com os dados do formulário'
    const cliente: Cliente = {
      nome: this.clienteForm.value.nome,
      identificacao: this.clienteForm.value.identificacao,
      nome_mae: this.clienteForm.value.nome_ref,
      nome_fantasia: this.clienteForm.value.nome_ref,
      inscricao_municipal: this.clienteForm.value.inscricao_municipal,
      inscricao_estadual: this.clienteForm.value.inscricao_estadual,
      data_cadastro: new Date(),
      situacao: 'Ativo'
    };

    console.error(cliente);

    this.clienteService.createCliente(cliente).subscribe(
      (data) => {
        console.error('Cliente criado com sucesso. Dados: ', data);
        this.router.navigate(['users/profile/cliente/home']);
      },
      (error) => {
        console.error('Erro ao criar cliente. Erro: ' + error);
        alert('Erro ao criar cliente. Erro: ' + error);
      }
    );

  }

  voltar() {
    this.router.navigate(['users/profile/cliente/']);
  }
}
