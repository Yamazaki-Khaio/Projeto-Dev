import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../email.service'; // Certifique-se de importar o serviço de e-mail correspondente

@Component({
  selector: 'app-email-cadastro',
  templateUrl: './email-cadastro.component.html',
  styleUrls: ['./email-cadastro.component.scss']
})
export class EmailCadastroComponent {
cancelar() {
throw new Error('Method not implemented.');
}
  @Output() emailAdicionado = new EventEmitter<any>();
  emailForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private emailService: EmailService) {
    this.initializeForm();
  }

  initializeForm() {
    this.emailForm = this.formBuilder.group({
      inputEmail: ['', [Validators.required, Validators.email]],
      isPrincipal: [false]
    });
  }

  adicionarEmail() {
    if (this.emailForm.valid) {
      const emailData = {
        email: this.emailForm.value.inputEmail,
        is_principal: this.emailForm.value.isPrincipal
      };

      // // Envie a solicitação para adicionar e-mail usando o serviço de e-mail
      // this.emailService.adicionarEmail(emailData).subscribe(
      //   response => {
      //     // Lógica para lidar com a resposta da API (opcional)
      //     console.log('E-mail adicionado com sucesso:', response);
      //   },
      //   error => {
      //     // Lógica para lidar com erros na solicitação (opcional)
      //     console.error('Erro ao adicionar e-mail:', error);
      //   }
      // );

      this.emailForm.reset();
    }
  }
}
