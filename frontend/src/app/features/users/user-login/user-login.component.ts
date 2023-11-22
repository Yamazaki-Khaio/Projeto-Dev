import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.sass']
})
export class UserLoginComponent implements OnInit {
  isPasswordVisible: boolean = false;
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Não é mais necessário chamar initializeForm() aqui
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formulário válido. Dados:', this.loginForm.value);
      // Adicione a lógica de submissão aqui, se necessário
    } else {
      console.log('Formulário inválido. Por favor, verifique os campos.');
    }
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
