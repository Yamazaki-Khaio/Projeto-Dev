import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    const endpoint = `${this.apiUrl}/conta/login`;
    const body = { email, senha: password, rememberMe };

    return this.http.post(endpoint, body).pipe(
      tap((response: any) => {
        // Salvar token no localStorage ao efetuar login com sucesso
        localStorage.setItem('token', response.token);
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<void> {
    const endpoint = `${this.apiUrl}/conta/logout`;

    return this.http.post<void>(endpoint, {}).pipe(
      tap(() => {
        // Limpar o token do localStorage ao efetuar logout com sucesso
        localStorage.removeItem('token');
      }),
      catchError(this.handleError)
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuth(): boolean {
    return this.getToken() !== null;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erro na requisição:', error);

    if (error.error && error.error.message) {
      return throwError(() => error.error.message);
    }

    return throwError(() => 'Ocorreu um erro na requisição. Tente novamente mais tarde.');
  }
}
