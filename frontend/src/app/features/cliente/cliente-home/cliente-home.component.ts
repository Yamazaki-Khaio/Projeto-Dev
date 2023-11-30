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
editarCliente() {
  this.router.navigate(['/profile/cliente/editar/{{cliente.id}}']);
}
  clientes$: Observable<Cliente[]>;
  private clientesSubscription: Subscription = new Subscription();

  constructor(private clienteService: ClienteService, private router: Router) {
    this.clientes$ = this.clienteService.getClientes();
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }

  adicionarCliente() {
    // Navegar para a rota de criação de cliente
    this.router.navigate(['/profile/cliente/cadastro']);
  }

  deleteClient(cliente: Cliente) {
    // Chamar o serviço para remover o cliente
    this.clienteService.deleteCliente(cliente.id.toString()).subscribe(
      () => {
        // Nenhuma ação necessária aqui, pois a lista é automaticamente atualizada pelo Observable.
      },
      (error) => {
        console.error('Erro ao excluir cliente:', error);
        // Adicione lógica para lidar com erros, como exibir uma mensagem ao usuário.
      }
    );
  }
}
