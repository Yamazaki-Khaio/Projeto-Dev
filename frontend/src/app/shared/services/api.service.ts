// src/services/api.service.ts
import axios, { AxiosResponse } from 'axios';

export class ApiService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    const url = `${this.apiUrl}/${endpoint}`;
    return axios.get<T>(url);
  }

  post<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
    const url = `${this.apiUrl}/${endpoint}`;
    return axios.post<T>(url, data);
  }

  put<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
    const url = `${this.apiUrl}/${endpoint}`;
    return axios.put<T>(url, data);
  }

  delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
    const url = `${this.apiUrl}/${endpoint}`;
    return axios.delete<T>(url);
  }



}
