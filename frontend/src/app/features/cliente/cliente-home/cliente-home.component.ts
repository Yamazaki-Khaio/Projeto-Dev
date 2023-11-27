import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.scss']
})
export class ClienteHomeComponent {
  clientes$: Observable<Cliente[]>;

  constructor(private clienteService: ClienteService) {
    this.clientes$ = this.clienteService.getClientes();
  }
}
