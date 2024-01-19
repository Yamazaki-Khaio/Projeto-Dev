import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TelefoneService } from '../telefone.service'; // Certifique-se de importar o serviço correto
import { ActivatedRoute } from '@angular/router';
import { Telefone } from '../telefone';
import { AlertService } from './../../../shared/services/alert.service';

@Component({
  selector: 'app-telefone-edit',
  templateUrl: './telefone-edit.component.html',
  styleUrls: ['./telefone-edit.component.scss'],
})

export class TelefoneEditComponent {
  @Output() telefoneEditado = new EventEmitter<any>();
  @Input() userId!: string;
  @Input() telefoneId!: number;
  telefoneForm!: FormGroup;
  isTemplateHidden: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private telefoneService: TelefoneService,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.telefoneService.getTelefone(this.telefoneId).subscribe(
      (telefone: Telefone) => {
        this.telefoneForm = this.formBuilder.group({
          inputTelefone: [telefone.tel, [Validators.required, Validators.pattern('[0-9]+')]],
          isPrincipal: [telefone.is_principal]
        });
      },
      (error: any) => {
        console.error('Erro ao carregar telefone:', error);
      }
    );
  }


  cancelar() {
    this.isTemplateHidden = true;
    this.telefoneEditado.emit("cancelado");
  }

  atualizarTelefone() {
    if (this.telefoneForm.valid) {
      const telefoneData: Telefone = {
        tel: this.telefoneForm.value.inputNumero,
        is_principal: this.telefoneForm.value.isPrincipal,
        id_pessoa: this.userId
      };

      this.telefoneService.updateTelefone(this.telefoneId, telefoneData).subscribe(
        response => {
          this.alertService.showAlert('Telefone atualizado com sucesso.', 'alert-warnig');
          this.telefoneEditado.emit('response');
          console.log('Telefone editado com sucesso!', response);
          // this.isTemplateHidden = true;
        },
        error => {
          this.alertService.showAlert('Erro ao atualizado telefone.', 'alert-danger');
          this.telefoneEditado.emit('error');
          console.error('Erro ao editar telefone:', error);
        }
      );
    }
  }
}
