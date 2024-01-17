import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TelefoneService } from '../telefone.service';
import { ActivatedRoute } from '@angular/router';
import { Telefone } from './../telefone';
import { AlertService } from './../../../shared/services/alert.service';

@Component({
  selector: 'app-telefone-cadastro',
  templateUrl: './telefone-cadastro.component.html',
  styleUrls: ['./telefone-cadastro.component.scss']
})
export class TelefoneCadastroComponent {

  @Output() telefoneAdicionado = new EventEmitter<any>();
  @Input() userId!: string; // Declare the userId property as an Input
  telefoneForm!: FormGroup;
  mostrarTemplate: boolean = true; // Add this line

  constructor(
    private formBuilder: FormBuilder,
    private telefoneService: TelefoneService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.telefoneForm = this.formBuilder.group({
      inputTelefone: ['', Validators.required],
      isPrincipal: [false]
    });
  }

  cancelar() {
    this.mostrarTemplate = false;
  }

  adicionarTelefone() {
    console.log('Adicionando telefone:', this.telefoneForm.value);
    if (this.telefoneForm.valid) {
      const telefoneData: Telefone = {
        tel: this.telefoneForm.value.inputTelefone,
        is_principal: this.telefoneForm.value.isPrincipal,
      };

      this.telefoneService.createTelefone(this.userId, telefoneData).subscribe(
        response => {
          console.log('Telefone adicionado com sucesso:', response);
          this.alertService.showAlert('Telefone adicionado com sucesso.', 'alert-primary');
          this.telefoneForm.reset();
          this.mostrarTemplate = false;
          this.telefoneAdicionado.emit(response);
        },
        error => {
          this.alertService.showAlert('Erro ao adicionar telefone.', 'alert-danger');
          this.telefoneAdicionado.emit(error);
          console.error('Erro ao adicionar telefone:', error);
        }
      );
    }
  }
}
