// FILEPATH: /c:/Users/kaio.fonseca/Documents/projeto-dev/Projeto-Dev/frontend/src/app/features/cliente/cliente.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly baseUrl = 'cliente'; // Rota base correspondente no backend

  constructor(private apiService: ApiService) { }

  // Obtém todos os clientes
  getClientes(): Observable<Cliente[]> {
    const endpoint = this.baseUrl;
    return this.apiService.get<Cliente[]>(endpoint);
  }

  // Obtém um cliente pelo ID
  getCliente(id: string): Observable<Cliente> {
    const endpoint = `${this.baseUrl}/${id}`;
    return this.apiService.get<Cliente>(endpoint);
  }

  // Cria um novo cliente
  createCliente(cliente: Cliente): Observable<Cliente> {
    const endpoint = this.baseUrl;
    return this.apiService.post<Cliente>(endpoint, cliente);
  }


  // Atualiza um cliente existente
  updateCliente(cliente: Cliente): Observable<Cliente> {
    const endpoint = `${this.baseUrl}/${cliente.id}`;
    return this.apiService.put<Cliente>(endpoint, cliente);
  }

  // Remove um cliente pelo ID
  deleteCliente(id: string): Observable<void> {
    const endpoint = `${this.baseUrl}/${id}`;
    return this.apiService.delete<void>(endpoint);
  }

  // Adicionar outros métodos específicos para a feature cliente, se necessário.
}
