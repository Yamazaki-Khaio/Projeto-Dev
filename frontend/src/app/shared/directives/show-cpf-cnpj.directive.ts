// app-show-cnpj-cpf.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShowCnpjCpf]'
})
export class ShowCnpjCpfDirective {
  @Input() set appShowCnpjCpf(identificador: string | undefined) {
    this.viewContainer.clear();

    if (identificador?.length === 11) {
      // CPF
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (identificador?.length === 14) {
      // CNPJ
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}
