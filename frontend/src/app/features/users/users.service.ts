// FILEPATH: /c:/Users/kaio.fonseca/Documents/projeto-dev/Projeto-Dev/frontend/src/app/features/users/user.service.ts

import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/data.service';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'conta'; // Rota base correspondente no backend

  constructor(private apiService: ApiService) {}

  // Obtém todos os usuários
  getUsers(): Promise<Users[]> {
    const endpoint = this.baseUrl;
    return this.apiService.request<Users[]>('GET', endpoint);
  }

  // Obtém um usuário pelo ID
  getUser(id: string): Promise<Users> {
    const endpoint = `${this.baseUrl}/${id}`;
    return this.apiService.request<Users>('GET', endpoint);
  }

  // Cria um novo usuário
  createUser(user: Users): Promise<Users> {
    const endpoint = this.baseUrl;
    return this.apiService.request<Users>('POST', endpoint, user);
  }

  // Atualiza um usuário existente
  updateUser(id: string, user: Users): Promise<Users> {
    const endpoint = `${this.baseUrl}/${id}`;
    return this.apiService.request<Users>('PUT', endpoint, user);
  }

  // Remove um usuário pelo ID
  deleteUser(id: string): Promise<void> {
    const endpoint = `${this.baseUrl}/${id}`;
    return this.apiService.request<void>('DELETE', endpoint);
  }

  // Adicione outros métodos conforme necessário para a feature de usuários
}
