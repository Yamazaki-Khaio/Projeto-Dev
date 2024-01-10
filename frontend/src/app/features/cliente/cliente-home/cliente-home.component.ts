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

  ngOnInit(): void {
    this.reloadClientes();
  }

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

  editarCliente(cliente: Cliente) {
    this.router.navigate([`/profile/cliente/editar/${cliente.id}`]);
  }

  deleteClient(cliente: Cliente) {
    const clienteId = cliente.id?.toString();
    if (clienteId) {
      this.clienteService.deleteCliente(clienteId).subscribe(
        () => {
          console.log('Cliente excluído com sucesso.');
          // Recarrega a lista de clientes após a exclusão
          this.reloadClientes();
        },
        (error) => {
          console.error('Erro ao excluir cliente. Erro: ', error);
          // Adicione tratamento de erro aqui, se necessário
        }
      );
    }
  }

  private reloadClientes() {
    this.clientesSubscription.unsubscribe();
    this.clientes$ = this.clienteService.getClientes();
    this.clientesSubscription = this.clientes$.subscribe(
      (data) => {
        console.log('Clientes carregados com sucesso. Dados: ', data);
      },
      (error) => {
        console.error('Erro ao carregar clientes. Erro: ' + error);
        alert('Erro ao carregar clientes. Erro: ' + error);
      }
    );
  }
}
