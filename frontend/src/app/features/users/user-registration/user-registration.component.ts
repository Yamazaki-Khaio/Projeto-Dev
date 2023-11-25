// FILEPATH: /c:/Users/kaio.fonseca/Documents/projeto-dev/Projeto-Dev/frontend/src/app/features/users/user-registration/user-registration.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PasswordMatchDirective } from 'src/app/shared/directives/password-match.directive';
import { UserService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.sass'],
  providers: [PasswordMatchDirective, UserService]

})
export class UserRegistrationComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({});


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.registrationForm.valueChanges.subscribe(console.log);
  }

  onSubmit(): void {
    const user = this.registrationForm.value;
    this.userService.createUser(user).then(() => {
      alert('Usuário cadastrado com sucesso!');
      // Roteie para users/login
      this.router.navigate(['/users/login']);
    }).catch(() => {
      alert('Ocorreu um erro ao cadastrar o usuário.');
    });

  }



}
