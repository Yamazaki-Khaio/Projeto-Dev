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
  currentUser: Users | null = null;

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
    this.usuarioEditForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      alterarSenha: [false],
      senhaAtual: [''],
      novaSenha: [''],
      confirmarNovaSenha: [''],
    });

    // Carrega os dados do usuário atual ao inicializar o componente
    this.userService.getUser().subscribe(
      (user) => {
        this.currentUser = user;
        // Preencha o formulário com os dados do usuário
        this.usuarioEditForm.patchValue({
          name: user.nome,
          email: user.email,
        });
      },
      (error) => {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    );
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
    if (!this.currentUser) {
      console.error('Usuário não encontrado.');
      return;
    }

    const user: Users = {
      id: this.currentUser.id,
      nome: this.usuarioEditForm.value.name,
      email: this.usuarioEditForm.value.email,
      senha: this.usuarioEditForm.value.novaSenha,
      senha_atual: this.usuarioEditForm.value.senhaAtual, // Adicione o campo senha_atual
    };

    this.userService.updateUser(user).subscribe(
      (data) => {
        console.log('Usuário atualizado com sucesso. Dados: ', data);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        alert('Erro ao atualizar usuário. Erro: ' + error);
      }
    );
  }
}
