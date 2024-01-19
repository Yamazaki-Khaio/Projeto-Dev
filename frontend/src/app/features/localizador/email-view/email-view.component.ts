import { Component, Input, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';
import { IconsService } from '../../../shared/util/icons.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  }

  sairModoEdicao($event: any): void {
    if ($event === 'cancelado') {
      this.modoEdicao = false;
    }
    this.carregarEmails();
  }
}
