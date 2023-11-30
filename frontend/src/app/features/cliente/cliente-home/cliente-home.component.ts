import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.scss']
})
export class ClienteHomeComponent implements OnInit, OnDestroy {
  clientes$: Observable<Cliente[]>;
  clientesSubscription: Subscription = new Subscription;

  constructor(private clienteService: ClienteService, private router: Router) {
    this.clientes$ = this.clienteService.getClientes();
  }

  ngOnInit(): void {
    this.clientesSubscription = this.clientes$.subscribe(
      (clientes) => {
        // Lógica para lidar com os dados dos clientes atualizados em tempo real
      },
      (error) => {
        console.error('Erro ao obter clientes:', error);
        // Adicione lógica para lidar com erros, como exibir uma mensagem ao usuário.
      }
    );
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }

  adicionarCliente() {
    // Navegar para a rota de criação de cliente
    this.router.navigate(['/clientes/novo']);
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
