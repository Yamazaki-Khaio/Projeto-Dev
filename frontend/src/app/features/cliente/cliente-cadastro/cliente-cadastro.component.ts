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
  emailError: string = 'Digite um CNPJ/CPF válido';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      inputIdentificacao: ['', [Validators.required, Validators.pattern(/^\d{14}$|^\d{18}$/)]],
      inputNome: ['', [Validators.required]],
      inputRef: ['', [Validators.required]],
    });

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
          this.router.navigate(['/profile/cliente/editar/' + data.id]);
        },
        (error: any) => {
          console.log(cliente);
          console.log(error);
        }
      );
    } else {
      console.log('Erro no formulário. Verifique os campos.');
    }
  }

  isCpfCnpjValid(): boolean {
    const cpfCnpj = this.clienteForm.value.inputIdentificacao.replace(/\D/g, '');

    return cpfCnpj.length === 14 || cpfCnpj.length === 18;
  }

  voltar() {
    this.router.navigate(['users/profile/cliente/']);
  }



}
