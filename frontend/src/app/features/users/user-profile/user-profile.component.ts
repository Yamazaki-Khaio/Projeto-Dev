// user-profile.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass'],
})
export class UserProfileComponent implements OnInit {


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // Obtenha os dados do perfil do usuário quando o componente for inicializado
    this.fetchUserProfileData();
  }

 
  fetchUserProfileData(): void {
    // Chame o serviço para obter os dados do perfil do usuário
    this.userService.getUsers().subscribe(
      (profileData) => {
        // Atualize os dados do perfil
        console.log('Dados do perfil:', profileData);
      },
      (error) => {
        console.error('Erro ao obter dados do perfil:', error);
        // Lide com o erro conforme necessário, como redirecionar para a página de login se não estiver autenticado.
      }
    );
  }
}
