// user-login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.sass'],
})
export class UserLoginComponent implements OnInit {
  isPasswordVisible: boolean = false;
  loginForm: FormGroup = new FormGroup({});
  apiErrorMessage: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

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
          this.apiErrorMessage = error;

           // Verifique o tipo de erro e defina as variáveis de erro correspondentes
           this.emailError = this.apiErrorMessage.includes('E-mail inserido incorreto');
           this.passwordError = this.apiErrorMessage.includes('Senha inserida incorreta');

        //  console.log('Erro ao fazer login:', error);

        }
      );
    } else {
      console.log('Formulário inválido. Por favor, verifique os campos.');

    }
  }
}
