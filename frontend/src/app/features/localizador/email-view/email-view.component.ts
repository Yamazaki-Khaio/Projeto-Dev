import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';
import { IconsService } from 'src/app/shared/util/icons.service';


@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss']
})
export class EmailViewComponent implements OnInit {
  emails: Email[] = [];
  delIcon: string = '';
  editIcon: string = '';

  constructor(private emailService: EmailService, private iconsService: IconsService) { }

  ngOnInit(): void {
    this.carregarEmails();
    this.delIcon = this.iconsService.getIconUrl('Excluir');
    this.editIcon = this.iconsService.getIconUrl('Editar');
  }

  carregarEmails() {
    this.emailService.getEmails().subscribe(
      (emails: Email[]) => {
        this.emails = emails;
      },
      error => {
        console.error('Erro ao carregar e-mails:', error);
      }
    );
  }
}
