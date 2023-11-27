// FILEPATH: /c:/Users/kaio.fonseca/Documents/projeto-dev/Projeto-Dev/frontend/src/app/features/users/user.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'conta'; // Rota base correspondente no backend

  constructor(private apiService: ApiService) { }

  // Obtém todos os usuários
  getUsers(): Observable<Users[]> {
    const endpoint = this.baseUrl;
    return this.apiService.get<Users[]>(endpoint);
  }

  // Obtém um usuário pelo ID
  getUser(id: string): Observable<Users> {
    const endpoint = `${this.baseUrl}/${id}`;
    return this.apiService.get<Users>(endpoint);
  }

  // Cria um novo usuário
  createUser(user: Users): Observable<Users> {
    const endpoint = this.baseUrl;
    return this.apiService.post<Users>(endpoint, user);
  }

  // Atualiza um usuário existente
  updateUser(id: string, user: Users): Observable<Users> {
    const endpoint = `${this.baseUrl}/${id}`;
    return this.apiService.put<Users>(endpoint, user);
  }

  // Remove um usuário pelo ID
  deleteUser(id: string): Observable<void> {
    const endpoint = `${this.baseUrl}/${id}`;
    return this.apiService.delete<void>(endpoint);
  }

  // Efetua login do usuário
  login(email: string, password: string): Observable<any> {
    const endpoint = `${this.baseUrl}/login`;
    const body = { email, senha: password };
    return this.apiService.post<any>(endpoint, body);

  }

  // Adicione outros métodos relacionados à autenticação, como logout, verificação de autenticação, etc.

  // Efetua logout do usuário
  logout() {
    localStorage.removeItem('token')
  }

  // Obtém o token do usuário
  getToken() {
    return localStorage.getItem('token')
  }

  // Verifica se o usuário está autenticado
  isAuth(): boolean {
    return this.getToken() !== null;
  }

}



