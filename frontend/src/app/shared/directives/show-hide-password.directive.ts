// src/app/shared/directives/show-hide-password.directive.ts

import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowHidePassword]'
})
export class ShowHidePasswordDirective {
  private isPasswordVisible: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onClick() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.togglePasswordVisibility();
  }

  private togglePasswordVisibility() {
    const inputType = this.isPasswordVisible ? 'text' : 'password';
    this.renderer.setProperty(this.el.nativeElement.previousElementSibling, 'type', inputType);
  }
}
