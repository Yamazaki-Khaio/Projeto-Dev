import { Directive, ElementRef, Input, OnInit } from '@angular/core';


@Directive({
  selector: '[appIdentificadorLabel]'
})
export class IdentificadorLabelDirective implements OnInit {
  @Input() appIdentificadorLabel!: number;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const labels = this.elementRef.nativeElement.querySelectorAll('label');
    const input = this.elementRef.nativeElement.querySelector('input');

    if (input) {
      input.addEventListener('input', () => {
        const inputValueLength = input.value.length;

        labels.forEach((label: HTMLLabelElement) => {
          const switchCase = parseInt(label.getAttribute('ngSwitchCase') ?? '0', 10);

          if (switchCase === inputValueLength) {
            label.style.display = 'block';
          } else {
            label.style.display = 'none';
          }
        });
      });
    }
  }
}
