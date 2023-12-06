import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.scss']
})
export class ClienteEditarComponent {
setSituacao(arg0: string) {
throw new Error('Method not implemented.');
}
  clienteForm: FormGroup = new FormGroup({});
  clienteId!: number;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clienteId = this.route.snapshot.params['id'];
    if (!this.clienteId) {
      this.clienteId = 0;
    }

    this.clienteService.getCliente(this.clienteId.toString()).subscribe(
      (cliente: Cliente) => {
        this.clienteForm = this.fb.group({
          inputNome: [cliente.nome, [Validators.required]],
          inputIdentificacao: [cliente.identificacao, [Validators.required, Validators.minLength(11)]],
          inputRef: [cliente.nome_ref, [Validators.required]],
          inputInscricaoMunicipal: [cliente.inscricao_municipal],
          inputInscricaoEstadual: [cliente.inscricao_estadual],
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    const cliente: Cliente = {
      id: this.clienteId,
      nome: this.clienteForm.value.inputNome,
      identificacao: this.clienteForm.value.inputIdentificacao,
      nome_ref: this.clienteForm.value.inputRef,
      inscricao_municipal: this.clienteForm.value.inputInscricaoMunicipal,
      inscricao_estadual: this.clienteForm.value.inputInscricaoEstadual,
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


