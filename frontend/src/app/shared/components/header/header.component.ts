// FILEPATH: /c:/Users/kaio.fonseca/Documents/projeto-dev/Projeto-Dev/frontend/src/app/shared/components/header/header.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../features/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  isDropdownOpen: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  editProfile() {
    // Adicione a lógica para editar o perfil aqui
    console.log('Editar Perfil');
    // Feche o dropdown após a ação
    this.isDropdownOpen = false;
    
  }

  logout() {
    // Redirecionar para a página de login
    this.userService.logout();


    this.router.navigate(['/users/login']);

    // Adicione a lógica de logout aqui
    console.log('Logout');

    // Feche o dropdown após a ação
    this.isDropdownOpen = false;
  }
}
