import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../users.service';
import { Router } from '@angular/router';
import { IconsService } from 'src/app/shared/util/icons.service';
import { Users } from '../users';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {

  usuarioEditForm!: FormGroup;
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  openedIconUrl: string = '';
  iconEdit: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private iconsService: IconsService,
    private modalService: NgbModal,
  ) {
    this.openedIconUrl = this.iconsService.getIconUrl('icon-obrigatorio');
    this.iconEdit = this.iconsService.getIconUrl('Editar');
  }

  ngOnInit(): void {
    // Inicializa o FormGroup aqui, não no construtor
    this.usuarioEditForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      alterarSenha: [false],
      senhaAtual: [''],
      novaSenha: [''],
      confirmarNovaSenha: [''],
      // Adicione outros campos conforme necessário
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  voltar(): void {
    this.modalService.dismissAll();
  }



  onSubmit(): void {
    // // Criar um objeto usuário com os dados do formulário
    // const user = {
    //   nome: this.usuarioEditForm.value.name,
    //   email: this.usuarioEditForm.value.email,
    //   senha: this.usuarioEditForm.value.novaSenha,};

    // // Chama o método updateUser() do serviço de usuários
    // this.userService.updateUser(user).subscribe(
    //   (data) => {
    //     console.log('Usuário atualizado com sucesso. Dados: ', data);
    //     // Redireciona para a página desejada após a atualização
    //     this.router.navigate(['/dashboard']);
    //   },
    //   (error) => {
    //     alert('Erro ao atualizar usuário. Erro: ' + error);
    //   }
    // );
  }
}
