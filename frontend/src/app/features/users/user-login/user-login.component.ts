// user-login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  changeTextColor(arg0: string) {
    throw new Error('Method not implemented.');
  }

  isPasswordVisible: boolean = false;
  loginForm: FormGroup = new FormGroup({});
  apiErrorMessage: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.userService.login(email, password).subscribe(
        (response) => {
          // Login bem-sucedido
          console.log('Usuário autenticado:', response);
          if (response.token) {
            // Armazene o token de autenticação no armazenamento local
            localStorage.setItem('token', response.token);
          }
          // Redirecione para a página desejada após o login
          this.router.navigate(['users/profile/home']);

        },
        (error) => {
          if (error === 'E-mail inserido incorreto. Tente novamente') {
            this.emailError = true;
            this.passwordError = false;
          } else if (error === 'Senha inserida incorreta. Tente novamente') {
            this.emailError = false;
            this.passwordError = true;
          } else {
            this.emailError = false;
            this.passwordError = false;
          }
          this.apiErrorMessage = error;

          console.log('Erro ao fazer login:', error);
        }
      );
    } else {
      console.log('Formulário inválido. Por favor, verifique os campos.');

    }
  }
}
