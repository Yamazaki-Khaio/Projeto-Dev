// user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass'],
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private modal: NgbModal) { }

  ngOnInit(): void {
    // Obtenha os dados do perfil do usuário quando o componente for inicializado
    this.fetchUserProfileData();
  }

  fetchUserProfileData(): void {

    // Chame o serviço para obter os dados do perfil do usuário

  }


  onEditProfileClicked(): void {
    // Lógica para lidar com o evento de editar perfil
    console.log('Evento: Editar Perfil');
    this.modal.hasOpenModals() ? this.modal.dismissAll() : null;
    this.modal.open(UserEditComponent, { size: 'md', centered: true });

    // Redirecionar para a página de edição de perfil (exemplo)
    this.router.navigate(['/edit-profile']);
  }

  onLogoutClicked(): void {

    // Chamar o serviço para efetuar o logout (exemplo)
    this.userService.logout();

    // Redirecionar para a página de login (exemplo)
    this.router.navigate(['/users/login']);
  }

}

