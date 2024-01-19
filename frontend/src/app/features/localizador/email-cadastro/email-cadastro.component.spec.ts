import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCadastroComponent } from './email-cadastro.component';

describe('EmailCadastroComponent', () => {
  let component: EmailCadastroComponent;
  let fixture: ComponentFixture<EmailCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailCadastroComponent]
    });
    fixture = TestBed.createComponent(EmailCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
