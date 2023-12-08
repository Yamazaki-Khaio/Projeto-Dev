import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { Email } from './email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly emailEndpoint = 'emails';
  
  constructor(private apiService: ApiService) {}

  getEmails(): Observable<Email[]> {
    return this.apiService.get<Email[]>(this.emailEndpoint);
  }

  getEmail(id: string): Observable<Email> {
    const endpoint = `${this.emailEndpoint}/${id}`;
    return this.apiService.get<Email>(endpoint);
  }

  createEmail(email: Email): Observable<Email> {
    return this.apiService.post<Email>(this.emailEndpoint, email);
  }

  updateEmail(email: Email): Observable<Email> {
    const endpoint = `${this.emailEndpoint}/${email.id}`;
    return this.apiService.put<Email>(endpoint, email);
  }

  deleteEmail(id: string): Observable<void> {
    const endpoint = `${this.emailEndpoint}/${id}`;
    return this.apiService.delete<void>(endpoint);
  }
}
