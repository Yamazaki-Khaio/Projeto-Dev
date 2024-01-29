import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Importe o serviço de autenticação aqui

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = 'http://localhost:3000/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  get<T>(url: string): Observable<T> {
    const headers = this.addTokenToHeaders();
    return this.http.get<T>(this.baseURL + url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(url: string, data: any): Observable<T> {
    const headers = this.addTokenToHeaders();
    return this.http.post<T>(this.baseURL + url, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(url: string, data: any): Observable<T> {
    const headers = this.addTokenToHeaders();
    return this.http.put<T>(this.baseURL + url, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(url: string): Observable<T> {
    const headers = this.addTokenToHeaders();
    return this.http.delete<T>(this.baseURL + url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erro na requisição:', error);

    if (error.status === 401) {
      // Lidar com erro de autenticação (token expirado, etc.)
      this.authService.logout();
      // Redirecionar para a página de login ou exibir uma mensagem ao usuário
      // ...

      return throwError(() => 'Sua sessão expirou. Faça login novamente.');
    }

    if (error.error && error.error.message) {
      return throwError(() => error.error.message);
    }

    return throwError(() => 'Ocorreu um erro na requisição. Tente novamente mais tarde.');
  }


  private addTokenToHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }

    return new HttpHeaders();
  }

}
