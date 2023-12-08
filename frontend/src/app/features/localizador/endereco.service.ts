import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Endereco } from './endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private readonly baseUrl = 'endereco'; // Rota base correspondente no backend

  constructor(private apiService: ApiService) { }

  // Obtém todos os endereços
  getEnderecos(): Observable<Endereco[]> {
    const endpoint = this.baseUrl;
    return this.apiService.get<Endereco[]>(endpoint);
  }

  // Obtém um endereço pelo ID
  getEndereco(id: string): Observable<Endereco> {
    const endpoint = `${this.baseUrl}/${id}`;
    return this.apiService.get<Endereco>(endpoint);
  }

  // Cria um novo endereço
  createEndereco(endereco: Endereco): Observable<Endereco> {
    const endpoint = this.baseUrl;
    return this.apiService.post<Endereco>(endpoint, endereco);
  }

  // Atualiza um endereço existente
  updateEndereco(endereco: Endereco): Observable<Endereco> {
    const endpoint = `${this.baseUrl}/${endereco.id}`;
    return this.apiService.put<Endereco>(endpoint, endereco);
  }

  // Remove um endereço pelo ID
  deleteEndereco(id: string): Observable<void> {
    const endpoint = `${this.baseUrl}/${id}`;
    return this.apiService.delete<void>(endpoint);
  }
}
