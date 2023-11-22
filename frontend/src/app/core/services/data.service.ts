import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url: string = 'http://localhost:3000/api/v1';
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: this.url
    });
  }

  // Manipulador de erros
  private handleError(error: AxiosError): Observable<never> {
    console.error('Erro na solicitação:', error);
    return throwError('Ocorreu um erro na solicitação.');
  }

  // Criar
  create(resource: string, data: any): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${resource}`, data)
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(this.handleError(error));
        });
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Ler todos
  readAll(resource: string): Observable<any> {
    return new Observable((observer) => {
      this.http.get(`${resource}`)
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(this.handleError(error));
        });
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Ler um
  readOne(resource: string, id: string): Observable<any> {
    return new Observable((observer) => {
      this.http.get(`${resource}/${id}`)
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(this.handleError(error));
        });
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Atualizar
  update(resource: string, id: string, data: any): Observable<any> {
    return new Observable((observer) => {
      this.http.put(`${resource}/${id}`, data)
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(this.handleError(error));
        });
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Deletar
  delete(resource: string, id: string): Observable<any> {
    return new Observable((observer) => {
      this.http.delete(`${resource}/${id}`)
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(this.handleError(error));
        });
    }).pipe(
      catchError(this.handleError)
    );
  }
}
