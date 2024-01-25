// FILEPATH: /c:/Users/kaio.fonseca/Documents/projeto-dev/Projeto-Dev/frontend/src/app/features/users/user.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'conta'; // Rota base correspondente no backend

  constructor(private apiService: ApiService, private authService: AuthService) { }

  getUsers(): Observable<Users[]> {
    const endpoint = this.baseUrl;
    return this.apiService.get<Users[]>(endpoint);
  }

  getUser(): Observable<Users> {
    const endpoint = `${this.baseUrl}/profile`;
    return this.apiService.get<Users>(endpoint);
  }

  createUser(user: Users): Observable<Users> {
    const endpoint = this.baseUrl;
    return this.apiService.post<Users>(endpoint, user);
  }

  updateUser(user: Users): Observable<Users> {
    const endpoint = `${this.baseUrl}/profile`;
    return this.apiService.put<Users>(endpoint, user);
  }

  deleteUser(id: string): Observable<void> {
    const endpoint = `${this.baseUrl}/${id}`;
    return this.apiService.delete<void>(endpoint);
  }

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    return this.authService.login(email, password, rememberMe);
  }

  logout(): Observable<void> {
    return this.authService.logout();
  }

  getToken(): string | null {
    return this.authService.getToken();
  }

  isAuth(): boolean {
    return this.authService.isAuth();
  }
}
