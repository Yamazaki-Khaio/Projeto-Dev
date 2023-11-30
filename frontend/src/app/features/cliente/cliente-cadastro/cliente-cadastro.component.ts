import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss']
})
export class ClienteCadastroComponent implements OnInit {
  clienteForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private router: Router) {}

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      identificador: ['', Validators.required],
      nome_mae: ['', Validators.required],
      nome_fantasia: ['', Validators.required],
      inscricao_municipal: [''],
      inscricao_estadual: [''],
      // Adicione outros campos conforme necessário
    });
  }

  submitForm() {
    if (this.clienteForm.valid) {
      this.clienteService.createCliente(this.clienteForm.value).subscribe(
        (response: Cliente) => {
          console.log('Cliente cadastrado com sucesso:', response.id);
          this.router.navigate(['users/profile/cliente/']);

          // Adicione a lógica desejada após o cadastro bem-sucedido
        },
        (error) => {
          console.error('Erro ao cadastrar cliente:', error);
          // Adicione a lógica desejada em caso de erro
        }
      );
    } else {
      Object.values(this.clienteForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
