// user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserEditComponent } from '../../pages/users/user-edit/user-edit.component';

@Component({
  selector: 'app-layout-logado',
  templateUrl: './layout-logado.component.html',
  styleUrls: ['./layout-logado.component.sass'],
})
export class LayoutLogadoComponent implements OnInit {

  constructor(private router: Router, private modal: NgbModal) { }

  ngOnInit(): void {
    // Obtenha os dados do perfil do usuário quando o componente for inicializado
    this.fetchLayoutLogadoData();
  }

  fetchLayoutLogadoData(): void {

    // Chame o serviço para obter os dados do perfil do usuário

  }


  onEditProfileClicked(): void {
    // Lógica para lidar com o evento de editar perfil
    this.modal.hasOpenModals() ? this.modal.dismissAll() : null;
    this.modal.open(UserEditComponent, { size: 'md', centered: true });

    // Redirecionar para a página de edição de perfil (exemplo)
  }

  onLogoutClicked(): void {
    // Lógica para lidar com o evento de logout


    // Redirecionar para a página de login (exemplo)
    this.router.navigate(['/login']);
  }

}

