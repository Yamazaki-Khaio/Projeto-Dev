import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appIdentificadorValidator]',
})
export class IdentificadorValidatorDirective {
  constructor(private el: ElementRef) {}

  @HostListener('blur') onBlur() {
    this.formatarIdentificador();
  }

  private formatarIdentificador() {
    const identificador = this.el.nativeElement.value.replace(/[^\d]/g, '');

    if (identificador.length === 11) {
      this.el.nativeElement.value = identificador.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');


    } else if (identificador.length === 14) {
      this.el.nativeElement.value = identificador.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  }
}
