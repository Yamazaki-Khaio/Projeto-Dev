// FILEPATH: /c:/Users/kaio.fonseca/Documents/projeto-dev/Projeto-Dev/frontend/src/app/shared/directives/password-match.directive.ts

import { Directive, Input, EventEmitter, Output } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi: true }]
})
export class PasswordMatchDirective implements Validator {
  @Input('appPasswordMatch') controlNameToCompare!: string;
  @Output() passwordMismatch = new EventEmitter<boolean>();

  validate(control: AbstractControl): ValidationErrors | null {
    const controlToCompare = control.parent?.get(this.controlNameToCompare);

    if (controlToCompare && controlToCompare.value !== control.value) {
      this.passwordMismatch.emit(true);
      return { passwordMismatch: true };
    }

    this.passwordMismatch.emit(false);
    return null;
  }
}
