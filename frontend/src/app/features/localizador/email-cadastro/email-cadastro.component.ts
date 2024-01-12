import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../email.service';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';

@Component({
  selector: 'app-email-cadastro',
  templateUrl: './email-cadastro.component.html',
  styleUrls: ['./email-cadastro.component.scss']
})
export class EmailCadastroComponent {
  @Output() emailAdicionado = new EventEmitter<any>();
  @Input() userId!: string; // Declare the userId property as an Input

  emailForm!: FormGroup;
  isTemplateHidden: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private route: ActivatedRoute
  ) {
    // this.userId = '';
  }

  ngOnInit() {

    this.emailForm = this.formBuilder.group({
      inputEmail: ['', [Validators.required, Validators.email]],
      isPrincipal: [false, Validators.required]
    });
  }

  cancelar() {
    this.isTemplateHidden = true;
  }

  adicionarEmail() {
    console.log('Adicionando e-mail:', this.emailForm.value);
    if (this.emailForm.valid) {
      const emailData: Email = {
        email: this.emailForm.value.inputEmail.toLowerCase(),
        is_principal: this.emailForm.value.isPrincipal,
        // cliente_id: parseInt(this.userId) // Convert the user ID to a number
      };

      this.emailService.createEmail(this.userId, emailData).subscribe(
        response => {
          console.log('E-mail adicionado com sucesso:', response);
        },
        error => {
          console.error('Erro ao adicionar e-mail:', error);
        }
      );

      this.emailForm.reset();
    }
  }
}
