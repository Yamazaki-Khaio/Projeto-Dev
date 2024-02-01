import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../email.service';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-email-edit',
  templateUrl: './email-edit.component.html',
  styleUrls: ['./email-edit.component.scss']
})
export class EmailEditComponent {
  @Output() emailEditado = new EventEmitter<any>();
  @Input() userId!: string; // Declare the userId property as an Input
  @Input() emailId!: number;
  emailForm!: FormGroup;
  isTemplateHidden: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private route: ActivatedRoute,
    private alertService: AlertService,

  ) { }

  ngOnInit() {
    this.emailService.getEmail(this.emailId).subscribe(
      (email: Email) => {
        this.emailForm = this.formBuilder.group({
          inputEmail: [email.email, [Validators.required, Validators.email]],
          isPrincipal: [email.is_principal]
        });
      },
      (error: any) => {
        console.error('Erro ao carregar e-mail:', error);
      }
    );
  }

  cancelar() {
    this.isTemplateHidden = true;
    this.emailEditado.emit("cancelado");
  }

  editarEmail() {
    console.log('Adicionando e-mail:', this.emailForm.value);
    if (this.emailForm.valid) {
      const emailData: Email = {
        email: this.emailForm.value.inputEmail.toLowerCase(),
        is_principal: this.emailForm.value.isPrincipal,
        id_pessoa: this.userId

      };

      this.emailService.updateEmail(this.emailId, emailData).subscribe(
        response => {
          this.alertService.showAlert('E-mail atualizado com sucesso.', 'alert-primary');
          this.emailEditado.emit('response');
          console.log('E-mail atualizado com sucesso!', response);
          this.emailForm.reset();
          this.isTemplateHidden = true;

        },
        error => {
          this.alertService.showAlert('Erro ao editar e-mail.', 'alert-danger');
          this.emailEditado.emit('error');
          console.error('Erro ao editar e-mail:', error);
        }
      );
    }
  }
}
