import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TelefoneService } from '../telefone.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-telefone-cadastro',
  templateUrl: './telefone-cadastro.component.html',
  styleUrls: ['./telefone-cadastro.component.scss']
})
export class TelefoneCadastroComponent {
  @Output() telefoneAdicionado = new EventEmitter<any>();
  telefoneForm!: FormGroup;
  userId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private telefoneService: TelefoneService,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Obtendo o ID do usuário da rota
      this.userId = +params['id']; // Certifique-se de converter para número, se necessário
    });
  }

  initializeForm() {
    this.telefoneForm = this.formBuilder.group({
      inputTelefone: ['', Validators.required],
      isPrincipal: [false]
    });
  }

  adicionarTelefone() {
    if (this.telefoneForm.valid) {
      const telefoneData = {
        tel: this.telefoneForm.value.inputTelefone,
        is_principal: this.telefoneForm.value.isPrincipal
      };

      // // Enviando a solicitação para a API com o ID do usuário
      // this.telefoneService.atualizarTelefone(this.userId, telefoneData).subscribe(
      //   response => {
      //     console.log('Telefone atualizado com sucesso:', response);
      //   },
      //   error => {
      //     console.error('Erro ao atualizar telefone:', error);
      //   }
      // );

      this.telefoneForm.reset();
    }
  }
}
