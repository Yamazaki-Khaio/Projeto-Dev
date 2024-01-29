import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizadorCadastroComponent } from './localizador-cadastro.component';

describe('LocalizadorCadastroComponent', () => {
  let component: LocalizadorCadastroComponent;
  let fixture: ComponentFixture<LocalizadorCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalizadorCadastroComponent]
    });
    fixture = TestBed.createComponent(LocalizadorCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
