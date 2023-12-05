import { IdentificadorLabelDirective } from './identificador-label.directive';
import { ElementRef } from '@angular/core';

describe('IdentificadorLabelDirective', () => {
  it('should create an instance', () => {
    const directive = new IdentificadorLabelDirective(new ElementRef(null)); // Pass ElementRef(null) as argument
    expect(directive).toBeTruthy();
  });
});
