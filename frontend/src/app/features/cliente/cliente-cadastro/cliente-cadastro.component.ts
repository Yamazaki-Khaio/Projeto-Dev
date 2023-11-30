import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss']
})
export class ClienteCadastroComponent implements OnInit {
  clienteForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      identificador: ['', Validators.required],
      nome_mae: [''],
      nome_fantasia: [''],
      inscricao_municipal: [''], // Adicionado campo inscricao_municipal
      inscricao_estadual: [''], // Adicionado campo inscricao_estadual
      // Adicione outros campos conforme necessário

      // Exemplo adicional:
      // email: ['', [Validators.required, Validators.email]],
    });
  }

  submitForm() {
    if (this.clienteForm.valid) {
      // Aqui você pode chamar o serviço para enviar os dados para o backend
      // Exemplo:
      this.clienteService.createCliente(this.clienteForm.value).subscribe(
         (response) => {
           console.log('Cliente cadastrado com sucesso:', response);
      //     // Adicione a lógica desejada após o cadastro bem-sucedido
         },
         (error) => {
           console.error('Erro ao cadastrar cliente:', error);
           // Adicione a lógica desejada em caso de erro
         }
       );
    } else {
      // Marque os campos como tocados para exibir mensagens de erro
      Object.values(this.clienteForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
