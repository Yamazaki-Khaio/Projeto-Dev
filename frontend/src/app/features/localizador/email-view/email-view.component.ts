import { Component, Input, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';
import { IconsService } from '../../../shared/util/icons.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailEditComponent } from '../email-edit/email-edit.component';
import { Observable } from 'rxjs';

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
    const emailId = email.id;
    const modalRef = this.modalService.open(EmailEditComponent, { size: 'sm' });
    modalRef.componentInstance.emailId = emailId;
    modalRef.componentInstance.userId = this.pessoaId;
    modalRef.componentInstance.emailAdicionado.subscribe(() => {
      modalRef.close();
      this.carregarEmails();
    });
  }

  removerEmail(emailId: number): void {
    this.emailService.deleteEmail(emailId).subscribe(
      () => {
        this.alertService.showAlert('E-mail removido com sucesso.', 'alert-primary');
        console.log('Email removido com sucesso!');
        this.carregarEmails();
      },
      (error: any) => {
        console.error('Erro ao remover e-mail:', error);
      }
    );
  }
}
