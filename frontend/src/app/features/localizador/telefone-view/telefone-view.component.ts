import { Component, Input, OnInit } from '@angular/core';
import { Telefone } from '../telefone';
import { TelefoneService } from '../telefone.service';
import { IconsService } from '../../../shared/util/icons.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DialogConfirmedComponent } from 'src/app/shared/components/dialog-confirmed/dialog-confirmed.component';

/// lembrar de ajustar esse componente para o novo modelo de cadastro de telefone e o component email tmb
@Component({
  selector: 'app-telefone-view',
  templateUrl: './telefone-view.component.html',
  styleUrls: ['./telefone-view.component.scss']
})
export class TelefoneViewComponent implements OnInit {
  telefones$!: Observable<Telefone[]>;
  delIcon: string = '';
  editIcon: string = '';
  @Input() pessoaId!: string;
  modoEdicao: boolean = false;
  telefoneIdParaEdicao!: number


  constructor(private telefoneService: TelefoneService, private iconsService: IconsService, private alertService: AlertService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.delIcon = this.iconsService.getIconUrl('Excluir');
    this.editIcon = this.iconsService.getIconUrl('Editar');
    this.carregarTelefones();
  }
  //criar utils para isso aqui
  carregarTelefones(): void {
    if (this.pessoaId) {
      this.telefones$ = this.telefoneService.getTelefonesPorUsuario(this.pessoaId);
      console.log(this.telefones$);
    }
  }

  editarTelefone(telefone: Telefone) {
    if (telefone.id !== undefined) {
      this.telefoneIdParaEdicao = telefone.id;
      this.modoEdicao = true;
    }
  }


  removerTelefone(telefoneId: number): void {
    const modalRef = this.modalService.open(DialogConfirmedComponent);
    modalRef.componentInstance.modalTitle = 'Excluir telefone?';
    modalRef.componentInstance.modalButtonText = 'Confirmar';
    modalRef.componentInstance.modalButtonClass = 'btn-danger';

    modalRef.componentInstance.onClose.subscribe(() => {
      // Lógica ao fechar o modal (pode ser vazia)
    });

    modalRef.componentInstance.onSaveChanges.subscribe(() => {
      // Se confirmado, então remove o telefone
      this.telefoneService.deleteTelefone(telefoneId).subscribe(
        () => {
          this.alertService.showAlert('Telefone removido com sucesso.', 'alert-primary');
          console.log('Telefone removido com sucesso!');
          this.carregarTelefones();
        },
        (error: any) => {
          console.error('Erro ao remover telefone:', error);
        }
      );
    });
  }

    //refatorar para novo modelo usando os utilitarios e services
  sairModoEdicao($event: any) {
    if ($event === 'cancelado') {
      this.modoEdicao = false;
    }
    else if ($event === 'response') {
      this.modoEdicao = false;
      this.carregarTelefones();
    }

  }
}
