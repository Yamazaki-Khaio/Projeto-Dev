import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
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

  getRepresentante(representateId: number): Observable<Representante> {
    const endpoint = `${this.representanteEndpoint}/${representateId}`;
    return this.apiService.get<Representante>(endpoint);
  }

  getRepresentantesPorUsuario(userId: string): Observable<Representante[]> {
    const endpoint = `${this.representanteEndpoint}/cliente/${userId}`;
    return this.apiService.get<Representante[]>(endpoint);
  }

  createRepresentante(representante: Representante, userId: string): Observable<Representante> {
    const endpoint = `${this.representanteEndpoint}/cliente/${userId}`;
    return this.apiService.post<Representante>(endpoint, representante);
  }

  updateRepresentante(representateId: number, representante: Representante): Observable<Representante> {
    const endpoint = `${this.representanteEndpoint}/${representateId}`;
    return this.apiService.put<Representante>(endpoint, representante);
  }

  deleteRepresentante(representateId: number): Observable<void> {
    const endpoint = `${this.representanteEndpoint}/${representateId}`;
    return this.apiService.delete<void>(endpoint);
  }
}
