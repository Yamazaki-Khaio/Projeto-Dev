import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordMatchDirective } from 'src/app/shared/directives/password-match.directive';
import { UserService } from '../users.service';
import { Router } from '@angular/router';
import { IconsService } from 'src/app/shared/util/icons.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.sass'],
  providers: [PasswordMatchDirective]

})
export class UserRegistrationComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({});
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  openedIconUrl: string = '';


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private iconsService: IconsService) {
    this.openedIconUrl = this.iconsService.getIconUrl('icon-obrigatorio');
   }

  ngOnInit(): void {
    // Inicializa o FormGroup aqui, não no construtor
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  onSubmit(): void {
    // Criar um objeto usuário com os dados do formulário'

    const user = {
      nome: this.registrationForm.value.name,
      email: this.registrationForm.value.email,
      senha: this.registrationForm.value.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    //console.log(user);
    // Chama o método createUser() do serviço de usuários
    this.userService.createUser(user).subscribe(
      (data) => {
        console.log('Usuário criado com sucesso. Dados: ', data);
        // Redireciona para a página de login
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Erro ao criar usuário. Erro: ' + error);
      }
    );



  }


}
