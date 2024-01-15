import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { Representante } from './representante';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {
  private readonly representanteEndpoint = 'representante';

  constructor(private apiService: ApiService) {}

  getRepresentantes(): Observable<Representante[]> {
    return this.apiService.get<Representante[]>(this.representanteEndpoint);
  }

  getRepresentante(id: string): Observable<Representante> {
    const endpoint = `${this.representanteEndpoint}/${id}`;
    return this.apiService.get<Representante>(endpoint);
  }

  createRepresentante(representante: Representante): Observable<Representante> {
    return this.apiService.post<Representante>(this.representanteEndpoint, representante);
  }

  updateRepresentante(id: string, representante: Representante): Observable<Representante> {
    const endpoint = `${this.representanteEndpoint}/${id}`;
    return this.apiService.put<Representante>(endpoint, representante);
  }

  deleteRepresentante(id: string): Observable<void> {
    const endpoint = `${this.representanteEndpoint}/${id}`;
    return this.apiService.delete<void>(endpoint);
  }
}
