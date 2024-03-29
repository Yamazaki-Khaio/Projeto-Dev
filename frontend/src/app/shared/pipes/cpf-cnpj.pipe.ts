import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpj'
})
export class CpfCnpjPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    if (value.length === 11) {
      return this.formatarCpf(value);
    } else if (value.length === 14) {
      return this.formatarCnpj(value);
    } else {
      return value; // Se não for CPF nem CNPJ, retorna o valor original
    }
  }

  private formatarCpf(cpf: string): string {
    return `${cpf.substr(0, 3)}.${cpf.substr(3, 3)}.${cpf.substr(6, 3)}-${cpf.substr(9, 2)}`;
  }

  private formatarCnpj(cnpj: string): string {
    return `${cnpj.substr(0, 2)}.${cnpj.substr(2, 3)}.${cnpj.substr(5, 3)}/${cnpj.substr(8, 4)}-${cnpj.substr(12, 2)}`;
  }
}
