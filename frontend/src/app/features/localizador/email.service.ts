import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { Email } from './email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly emailEndpoint = 'email';

  constructor(private apiService: ApiService) {}

  getEmails(): Observable<Email[]> {
    return this.apiService.get<Email[]>(this.emailEndpoint);
  }

  getEmailsPorUsuario(id_pessoa: string): Observable<Email[]> {
    const endpoint = `${this.emailEndpoint}/${id_pessoa}`;
    return this.apiService.get<Email[]>(endpoint);
  }

  getEmail(id: number): Observable<Email> {
    const endpoint = `${this.emailEndpoint}/${id}`;
    return this.apiService.get<Email>(endpoint);
  }

  createEmail(id_pessoa: string, email: Email): Observable<Email> {
    const endpoint = `${this.emailEndpoint}/${id_pessoa}`;
    return this.apiService.post<Email>(endpoint, email);
  }

  updateEmail(id: number, email: Email): Observable<Email> {
    const endpoint = `${this.emailEndpoint}/${id}`;
    return this.apiService.put<Email>(endpoint, email);
  }

  deleteEmail(id: number): Observable<void> {
    const endpoint = `${this.emailEndpoint}/${id}`;
    return this.apiService.delete<void>(endpoint);
  }
}
