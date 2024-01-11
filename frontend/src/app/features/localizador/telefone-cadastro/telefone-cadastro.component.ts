import { Component, EventEmitter, Output } from '@angular/core';
import { Form, FormGroup, FormBuilder } from '@angular/forms';
import { TelefoneService } from '../telefone.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-telefone-cadastro',
  templateUrl: './telefone-cadastro.component.html',
  styleUrls: ['./telefone-cadastro.component.scss']
})
export class TelefoneCadastroComponent {
  @Output() telefoneAdicionado = new EventEmitter<any>();
  telefoneForm: FormGroup = new FormGroup({});

  constructor(private FormBuilder: FormBuilder, private telefoneService: TelefoneService) {
    this.telefoneForm = this.FormBuilder.group({
      inputTelefone: ['']


    });
  }
  adicionarTelefone() {
    if (this.telefoneForm.valid) {
      this.telefoneAdicionado.emit(this.telefoneForm.value);
      this.telefoneForm.reset();
    }
  }

}
