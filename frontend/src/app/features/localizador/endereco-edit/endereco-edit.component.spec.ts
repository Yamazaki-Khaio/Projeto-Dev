import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoEditarComponent } from './endereco-edit.component';

describe('EnderecoEditComponent', () => {
  let component: EnderecoEditarComponent;
  let fixture: ComponentFixture<EnderecoEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnderecoEditarComponent]
    });
    fixture = TestBed.createComponent(EnderecoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
