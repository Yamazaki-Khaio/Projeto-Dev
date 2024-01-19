import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { Telefone } from './telefone';

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {
  private readonly telefoneEndpoint = 'telefone';

  constructor(private apiService: ApiService) {}

  getTelefones(): Observable<Telefone[]> {
    return this.apiService.get<Telefone[]>(this.telefoneEndpoint);
  }
  getTelefonesPorUsuario(id_pessoa: string): Observable<Telefone[]> {
    const endpoint = `${this.telefoneEndpoint}/${id_pessoa}`;
    return this.apiService.get<Telefone[]>(endpoint);
  }

  getTelefone(id: number): Observable<Telefone> {
    const endpoint = `${this.telefoneEndpoint}/${id}`;
    return this.apiService.get<Telefone>(endpoint);
  }

  createTelefone(id_pessoa: string, telefone: Telefone): Observable<Telefone> {
    const endpoint = `${this.telefoneEndpoint}/${id_pessoa}`;
    return this.apiService.post<Telefone>(endpoint, telefone);
  }

  updateTelefone(id: number, telefone: Telefone): Observable<Telefone> {
    const endpoint = `${this.telefoneEndpoint}/${id}`;
    return this.apiService.put<Telefone>(endpoint, telefone);
  }

  deleteTelefone(id: number): Observable<void> {
    const endpoint = `${this.telefoneEndpoint}/${id}`;
    return this.apiService.delete<void>(endpoint);
  }
}
