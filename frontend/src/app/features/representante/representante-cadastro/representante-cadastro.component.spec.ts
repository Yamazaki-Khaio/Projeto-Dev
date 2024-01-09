import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentanteCadastroComponent } from './representante-cadastro.component';

describe('RepresentanteCadastroComponent', () => {
  let component: RepresentanteCadastroComponent;
  let fixture: ComponentFixture<RepresentanteCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepresentanteCadastroComponent]
    });
    fixture = TestBed.createComponent(RepresentanteCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
