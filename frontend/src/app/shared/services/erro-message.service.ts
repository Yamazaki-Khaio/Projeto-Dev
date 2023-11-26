import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  private errorMessages: { [key: string]: string } = {};

  setErrorMessage(key: string, message: string): void {
    this.errorMessages[key] = message;
  }

  getErrorMessage(key: string): string {
    return this.errorMessages[key] || 'Erro desconhecido.';
  }
}
