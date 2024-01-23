import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../core/services/api.service';
import { Endereco } from './endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private readonly baseUrl = 'endereco'; // Rota base correspondente no backend

  constructor(private apiService: ApiService) { }

  // Obtém todos os endereços para um usuário específico
  getEnderecosPorUsuario(userId: string): Observable<Endereco[]> {
    const endpoint = `${this.baseUrl}/pessoa/${userId}`;
    return this.apiService.get<Endereco[]>(endpoint);
  }

  getEndereco(enderecoId: number): Observable<Endereco> {
    const endpoint = `${this.baseUrl}/${enderecoId}`;
    return this.apiService.get<Endereco>(endpoint);
  }

  // Cria um novo endereço para um usuário específico
  createEndereco(userId: string, endereco: Endereco): Observable<Endereco> {
    const endpoint = `${this.baseUrl}/pessoa/${userId}`;
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

  // Adiciona uma propriedade is_principal para todos os endereços

  //serviço para obter todos os endereços de um usuário e adicionar a propriedade is_principal
  getEnderecosComIsPrincipal(userId: string): Observable<Endereco[]> {
    return this.getEnderecosPorUsuario(userId).pipe(
      map(enderecos => enderecos.map(endereco => ({ ...endereco, is_principal: false })))
    );
  }
}
