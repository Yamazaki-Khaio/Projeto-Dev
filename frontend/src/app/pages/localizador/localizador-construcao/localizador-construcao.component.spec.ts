import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizadorConstrucaoComponent } from './localizador-construcao.component';

describe('LocalizadorConstrucaoComponent', () => {
  let component: LocalizadorConstrucaoComponent;
  let fixture: ComponentFixture<LocalizadorConstrucaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalizadorConstrucaoComponent]
    });
    fixture = TestBed.createComponent(LocalizadorConstrucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
