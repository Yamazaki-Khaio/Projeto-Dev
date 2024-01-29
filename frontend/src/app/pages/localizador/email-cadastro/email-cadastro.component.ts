import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../email.service';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';
import { AlertService } from './../../../shared/services/alert.service';

@Component({
  selector: 'app-email-cadastro',
  templateUrl: './email-cadastro.component.html',
  styleUrls: ['./email-cadastro.component.scss']
})
export class EmailCadastroComponent {
  @Output() emailAdicionado = new EventEmitter<any>();
  @Input() userId!: string; // Declare the userId property as an Input
  enderecoId!: number;

  emailForm!: FormGroup;
  mostrarTemplate: boolean = true; // Adicione esta linha

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private route: ActivatedRoute,
    private alertService: AlertService,

  ) {}

  ngOnInit() {

    this.emailForm = this.formBuilder.group({
      inputEmail: ['', [Validators.required, Validators.email]],
      isPrincipal: [false]
    });
  }

  cancelar() {
    this.mostrarTemplate = false;
    }

  adicionarEmail() {
    console.log('Adicionando e-mail:', this.emailForm.value);
    if (this.emailForm.valid) {
      const emailData: Email = {
        email: this.emailForm.value.inputEmail.toLowerCase(),
        is_principal: this.emailForm.value.isPrincipal,
        id_pessoa: this.userId
        // cliente_id: parseInt(this.userId) // Convert the user ID to a number
      };

      this.emailService.createEmail(this.userId, emailData).subscribe(
        response => {
          console.log('E-mail adicionado com sucesso:', response);
          this.alertService.showAlert('E-mail adicionado com sucesso.', 'alert-primary');
          this.emailForm.reset();
          this.mostrarTemplate = false;
          this.emailAdicionado.emit(response);


        },
        error => {
          this.alertService.showAlert('Erro ao adicionar e-mail.', 'alert-danger');
          this.emailAdicionado.emit(error);
          console.error('Erro ao adicionar e-mail:', error);
        }
      );


    }
  }
}
