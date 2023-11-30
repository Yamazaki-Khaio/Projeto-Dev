import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';

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
      nome_fantasia: ['', [Validators.required]], // ou nome_mae caso seja pessoa física 
      incricao_municipal: [''],
      incricao_estadual: ['']
    });
  }

  submitForm() {
    if (this.clienteForm.valid) {
      const dadosUsuario = this.clienteForm.value;
      console.log('Dados do cliente:', dadosUsuario);
      this.clienteService.createCliente(dadosUsuario).subscribe(
        (response) => {
          console.error('Cliente cadastrado com sucesso:', dadosUsuario.id);
          console.log('Cliente cadastrado com sucesso:', response.nome);

          // Redirecionar para a tela de edição do cliente
          this.router.navigate(['users/profile/cliente/editar/', response.id]);
        },
        (error) => {
          console.error('Erro ao cadastrar cliente:', error);
          // Adicione a lógica desejada em caso de erro
        }
      );
    } else {
      Object.values(this.clienteForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  voltar() {
    this.router.navigate(['users/profile/cliente/']);
  }
}
