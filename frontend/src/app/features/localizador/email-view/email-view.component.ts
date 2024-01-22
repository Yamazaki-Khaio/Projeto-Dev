import { Component, Input, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';
import { IconsService } from '../../../shared/util/icons.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DialogConfirmedComponent } from 'src/app/shared/components/dialog-confirmed/dialog-confirmed.component';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss']
})
export class EmailViewComponent implements OnInit {
  emails$!: Observable<Email[]>;
  delIcon: string = '';
  editIcon: string = '';
  @Input() pessoaId!: string;
  modoEdicao: boolean = false;
  emailIdParaEdicao!: number;

  constructor(private emailService: EmailService, private iconsService: IconsService, private alertService: AlertService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.delIcon = this.iconsService.getIconUrl('Excluir');
    this.editIcon = this.iconsService.getIconUrl('Editar');
    this.carregarEmails();
  }

  carregarEmails(): void {
    if (this.pessoaId) {
      this.emails$ = this.emailService.getEmailsPorUsuario(this.pessoaId);
    }
  }

  editarEmail(email: Email): void {
    if (email.id !== undefined) {
      this.emailIdParaEdicao = email.id;
      this.modoEdicao = true;
    }
  }

  removerEmail(emailId: number): void {
    const modalRef = this.modalService.open(DialogConfirmedComponent);
    modalRef.componentInstance.modalTitle = 'Excluir e-mail?';
    modalRef.componentInstance.modalButtonText = 'Confirmar';
    modalRef.componentInstance.modalButtonClass = 'btn-danger';

    modalRef.componentInstance.onClose.subscribe(() => {
      // Lógica ao fechar o modal (pode ser vazia)
    });

    modalRef.componentInstance.onSaveChanges.subscribe(() => {
      // Se confirmado, então remove o e-mail
      this.emailService.deleteEmail(emailId).subscribe(
        () => {
          this.alertService.showAlert('E-mail removido com sucesso.', 'alert-primary');
          console.log('E-mail removido com sucesso!');
          this.carregarEmails();
        },
        (error: any) => {
          console.error('Erro ao remover e-mail:', error);
        }
      );
    });
  }


  sairModoEdicao($event: any): void {
    if ($event === 'cancelado') {
      this.modoEdicao = false;
    } else if ($event === 'response'){
      this.modoEdicao = false;
      this.carregarEmails();
    }
  }
}
