import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/conta/login`;
    const body = { email, senha: password };

    return this.http.post(url, body);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    
    return localStorage.getItem('token');

  }

  isAuth(): boolean {
    return this.getToken() !== null;
  }
}
