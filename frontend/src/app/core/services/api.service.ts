import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  // Realiza uma requisição GET
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseURL + url).pipe(
      catchError(this.handleError)
    );
  }

  // Realiza uma requisição POST
  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(this.baseURL + url, data).pipe(
      catchError(this.handleError)
    );
  }

  // Realiza uma requisição PUT
  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(this.baseURL + url, data).pipe(
      catchError(this.handleError)
    );
  }

  // Realiza uma requisição DELETE
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.baseURL + url).pipe(
      catchError(this.handleError)
    );
  }

  // Método genérico para realizar requisições HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erro na requisição:', error);

    // Se a resposta da API contiver uma mensagem de erro, retorne-a
    if (error.error && error.error.message) {
      return throwError(() => error.error.message);
    }

    // Mensagem padrão para outros erros
    return throwError(() => 'Ocorreu um erro na requisição. Tente novamente mais tarde.');
  }
}
