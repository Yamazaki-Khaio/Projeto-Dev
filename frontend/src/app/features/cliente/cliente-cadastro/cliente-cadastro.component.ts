// cliente-cadastro.component.ts

import { Component, OnInit } from '@angular/core';
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


  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      inputNome: ['', [Validators.required]],
      inputIdentificacao: ['', [Validators.required, Validators.minLength(11)]],
      inputRef: ['', [Validators.required]],
      inputInscricaoMunicipal: [''],
      inputInscricaoEstadual: [''],
    });

  }

  OnSubmit(): void {
    const cliente: Cliente = {
      nome: this.clienteForm.value.inputNome,
      identificacao: this.clienteForm.value.inputIdentificacao,
      nome_ref: this.clienteForm.value.inputRef,
      inscricao_municipal: this.clienteForm.value.inputInscricaoMunicipal,
      inscricao_estadual: this.clienteForm.value.inputInscricaoEstadual,
    };

    this.clienteService.createCliente(cliente).subscribe(
      (data: Cliente) => {
        console.log(data);
        this.router.navigate(['users/profile/cliente/' + data.id]);
      },
      (error: any) => {
        console.log(cliente);
        console.log(error);
      }
    );
  }



  voltar() {
      this.router.navigate(['users/profile/cliente/']);
    }

}
