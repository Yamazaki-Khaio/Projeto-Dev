// FILEPATH: /c:/Users/kaio.fonseca/Documents/projeto-dev/Projeto-Dev/frontend/src/app/core/services/api.service.ts

import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000/', // Rota base do seu backend
    });
  }

  async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>({
        method,
        url: endpoint,
        data
      });
      return response.data;
    } catch (error: unknown) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  private handleError(error: AxiosError): void {
    console.error('Erro na requisição:', error);
    throw Error('Ocorreu um erro na requisição. Tente novamente mais tarde.');
  }
}
