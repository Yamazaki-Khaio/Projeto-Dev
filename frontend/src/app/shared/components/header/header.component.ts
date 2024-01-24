// FILEPATH: /c:/Users/kaio.fonseca/Documents/projeto-dev/Projeto-Dev/frontend/src/app/shared/components/header/header.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../features/users/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  isDropdownOpen: boolean = false;
  @Output() editProfileClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() logoutClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private userService: UserService, private modal: NgbModal) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  editProfile() {
    // Redirecionar para a página de edição de perfil
    this.modal.hasOpenModals() ? this.modal.dismissAll() : null;

    // Emitir evento para indicar que o perfil está sendo editado
    this.editProfileClicked.emit();

    // Feche o dropdown após a ação
    this.isDropdownOpen = false;
  }

  logout() {
    // Redirecionar para a página de login
    this.userService.logout();

    // Emitir evento para indicar que o logout está sendo executado
    this.logoutClicked.emit();

    this.router.navigate(['/users/login']);

    // Feche o dropdown após a ação
    this.isDropdownOpen = false;
  }
}
