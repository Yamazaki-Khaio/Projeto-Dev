import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
import { Observable, Subscription } from 'rxjs';
import { IconsService } from 'src/app/shared/util/icons.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogConfirmedComponent } from 'src/app/shared/components/dialog-confirmed/dialog-confirmed.component';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.scss']
})
export class ClienteHomeComponent implements OnDestroy {
  clientes$: Observable<Cliente[]>;
  private clientesSubscription: Subscription = new Subscription();
  delIcon: string = '';
  editIcon: string = '';
  constructor(private clienteService: ClienteService, private router: Router, private IconsService: IconsService, private modalService: NgbModal) {
    this.clientes$ = this.clienteService.getClientes();
    this.delIcon = this.IconsService.getIconUrl('Excluir');
    this.editIcon = this.IconsService.getIconUrl('Editar');

  }

  ngOnInit(): void {
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

  // ...

  deleteClient(cliente: Cliente) {
    const clienteId = cliente.id?.toString();
    if (clienteId) {
      const modalRef = this.modalService.open(DialogConfirmedComponent);
      modalRef.componentInstance.modalTitle = 'Excluir cliente?';
      modalRef.componentInstance.modalButtonText = 'Confirmar';
      modalRef.componentInstance.modalButtonClass = 'btn-danger';

      modalRef.componentInstance.onClose.subscribe(() => {
        // Logic when the modal is closed (can be empty)
      });

      modalRef.componentInstance.onSaveChanges.subscribe(() => {
        // If confirmed, then delete the client
        this.clienteService.deleteCliente(clienteId).subscribe(
          () => {
            console.log('Cliente excluído com sucesso.');
            // Reload the list of clients after deletion
            this.reloadClientes();
          },
          (error) => {
            console.error('Erro ao excluir cliente. Erro: ', error);
            // Add error handling here, if necessary
          }
        );
      });
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

  formatarCpfCnpj(identificacao: string): string {
    if (identificacao.length === 11) {
      return `${identificacao.substr(0, 3)}.${identificacao.substr(3, 3)}.${identificacao.substr(6, 3)}-${identificacao.substr(9)}`;
    } else if (identificacao.length === 14) {
      return `${identificacao.substr(0, 2)}.${identificacao.substr(2, 3)}.${identificacao.substr(5, 3)}/${identificacao.substr(8, 4)}-${identificacao.substr(12)}`;
    }
    // Se não for CPF nem CNPJ, retorna sem formatação
    return identificacao;
  }

  getBadgeClass(situacao: string): string {
    switch (situacao) {
      case 'Ativo':
        return 'badge badge-success';
      case 'Inativo':
        return 'badge badge-warning';
      case 'Negativado':
        return 'badge badge-danger';
      default:
        return 'badge badge-primary';
    }
  }
}
