import { Directive, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

@Directive({
  selector: '[appIdentificadorValidator][ngModel],[appIdentificadorValidator][formControl],[appIdentificadorValidator][formControlName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentificadorValidatorDirective),
      multi: true
    }
  ]
})
export class IdentificadorValidatorDirective implements Validator, OnChanges {
  @Input() formato: string | undefined;

  private valFn: ValidatorFn = Validators.nullValidator;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['formato'];
    if (change) {
      const val: string = change.currentValue;
      this.valFn = this.identificadorValidator(val);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.valFn(control);
  }

  private identificadorValidator(formato: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      if (formato === 'CPF' && !this.isCpf(value)) {
        return { formatoInvalido: true };
      }

      if (formato === 'CNPJ' && !this.isCnpj(value)) {
        return { formatoInvalido: true };
      }

      return null;
    };
  }

  private isCpf(value: string): boolean {
    // Adicione lógica para verificar se é um CPF válido
    return true; // Exemplo simplificado
  }

  private isCnpj(value: string): boolean {
    // Adicione lógica para verificar se é um CNPJ válido
    return true; // Exemplo simplificado
  }
}
