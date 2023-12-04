import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.scss']
})
export class ClienteHomeComponent implements OnDestroy {

  clientes$: Observable<Cliente[]>;
  private clientesSubscription: Subscription = new Subscription();

  constructor(private clienteService: ClienteService, private router: Router) {
    this.clientes$ = this.clienteService.getClientes();
  }
 /** ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.clientesSubscription = this.clienteService.getClientes().subscribe(
      (data) => {
        console.error('Clientes carregados com sucesso. Dados: ', data);
      },
      (error) => {
        console.error('Erro ao carregar clientes. Erro: ' + error);
        alert('Erro ao carregar clientes. Erro: ' + error);
      }
    );
  }

  */
  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }

  adicionarCliente() {
    // Navegar para a rota de criação de cliente
    this.router.navigate(['/profile/cliente/cadastro']);
  }

  editarCliente() {
    this.router.navigate(['/profile/cliente/editar/{{cliente.id}']);
  }

  deleteClient(cliente: Cliente) {
    // Chama o método deleteCliente() do serviço de clientes

  }
}
