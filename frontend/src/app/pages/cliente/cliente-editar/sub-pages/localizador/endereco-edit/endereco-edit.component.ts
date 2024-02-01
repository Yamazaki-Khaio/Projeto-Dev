import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Endereco } from '../endereco';
import { EnderecoService } from '../endereco.service';
import { IconsService } from 'src/app/shared/util/icons.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-endereco-editar',
  templateUrl: './endereco-edit.component.html',
  styleUrls: ['../endereco-cadastro/endereco-cadastro.component.scss']
})
export class EnderecoEditarComponent implements OnInit {
  enderecoEditForm!: FormGroup;
  alertMessage?: string;
  openedIconUrl: string = '';
  pessoaId!: string;
  iconAdd: string = '';
  enderecoId!: number;


  constructor(
    private fb: FormBuilder,
    private enderecoService: EnderecoService,
    private iconsService: IconsService,
    private alertService: AlertService,
    private activeModal: NgbActiveModal,


  ) { }

  ngOnInit(): void {
    this.openedIconUrl = this.iconsService.getIconUrl("icon-obrigatorio");
    this.iconAdd = this.iconsService.getIconUrl("add");
    this.enderecoService.getEndereco(this.enderecoId).subscribe(
      (endereco: Endereco) => {
        this.enderecoEditForm = this.fb.group({
          cep: [endereco.cep, [Validators.required]],
          logradouro: [endereco.logradouro, [Validators.required]],
          numero: [endereco.numero, [Validators.required]],
          complemento: [endereco.complemento],
          bairro: [endereco.bairro, [Validators.required]],
          cidade: [endereco.cidade, [Validators.required]],
          estado: [endereco.estado, [Validators.required]],
          isPrincipal: [endereco.is_principal, [Validators.required]],
        });
      },
      (error: any) => {
        console.error('Erro ao carregar endereço:', error);
      }
    );

  }




  onSubmit(): void {
    const endereco: Endereco = {
      id: this.enderecoId,
      cep: this.enderecoEditForm.value.cep,
      logradouro: this.enderecoEditForm.value.logradouro,
      numero: this.enderecoEditForm.value.numero,
      complemento: this.enderecoEditForm.value.complemento,
      bairro: this.enderecoEditForm.value.bairro,
      cidade: this.enderecoEditForm.value.cidade,
      estado: this.enderecoEditForm.value.estado,
      id_pessoa: this.pessoaId,
      is_principal: this.enderecoEditForm.value.isPrincipal,
    };

    // console.log(endereco);

    this.enderecoService.updateEndereco(endereco).subscribe(
      (data: Endereco) => {
        console.log(data);
        this.activeModal.close(); // Fechar o modal após a conclusão da requisição
        this.alertService.showAlert('Endereço atualizado com sucesso!', 'alert-primary');
      },
      (error: any) => {
        console.error(error);
        this.alertService.showAlert('Erro ao atualizar endereço!', 'alert-danger');
      }
    );
  }

  voltar() {
    this.activeModal.dismiss(); // Fechar o modal sem atualizar
    // this.router.navigate(['/localizador/endereco/', this.pessoaId]);
  }
}
