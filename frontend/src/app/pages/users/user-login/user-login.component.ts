import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../users.service';
import { Router } from '@angular/router';
import { IconsService } from 'src/app/shared/util/icons.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {

  isPasswordVisible: boolean = false;
  loginForm!: FormGroup;
  apiErrorMessage: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;
  openedIconUrl: string = '';
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private iconsService: IconsService) {
    this.openedIconUrl = this.iconsService.getIconUrl('icon-obrigatorio');
   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],

    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;

      this.userService.login(email, password, rememberMe).subscribe(
        (response) => {
          // Login bem-sucedido
          if (response.token) {
            // Armazene o token de autenticação no armazenamento local
            localStorage.setItem('token', response.token);
            localStorage.setItem('rememberMe', rememberMe.toString());

          }
          // Redirecione para a página desejada após o login
          this.router.navigate(['/profile/clientes/home']);

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

        }
      );
    } else {
      this.loginForm.markAllAsTouched();
      
    }
  }
}
