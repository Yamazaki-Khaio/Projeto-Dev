import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appShowHidePassword]'
})
export class ShowHidePasswordDirective {
  private isPasswordVisible: boolean = false;

  constructor(private el: ElementRef) { }

  @HostListener('click') onClick() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.togglePasswordVisibility();
  }

  private togglePasswordVisibility() {
    const inputType = this.isPasswordVisible ? 'text' : 'password';
    this.el.nativeElement.previousElementSibling.type = inputType;
  }
}

