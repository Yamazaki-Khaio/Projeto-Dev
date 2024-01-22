import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnderecoService } from '../endereco.service';
import { IconsService } from 'src/app/shared/util/icons.service';
import { Endereco } from '../endereco';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnderecoEditarComponent } from '../endereco-edit/endereco-edit.component';
import { EnderecoSharedService } from 'src/app/shared/services/endereco-shared.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DialogConfirmedComponent } from 'src/app/shared/components/dialog-confirmed/dialog-confirmed.component';

@Component({
  selector: 'app-endereco-view',
  templateUrl: './endereco-view.component.html',
  styleUrls: ['./endereco-view.component.scss']
})
export class EnderecoViewComponent implements OnInit {

  @Input() pessoaId!: string;
  enderecos$: Observable<Endereco[]> = new Observable<Endereco[]>();
  delIcon: string = '';
  editIcon: string = '';

  constructor(
    private enderecoService: EnderecoService,
    private route: ActivatedRoute,
    private iconsService: IconsService,
    private modalService: NgbModal,
    private enderecoSharedService: EnderecoSharedService,
    private alertService: AlertService,
  ) {
    this.delIcon = this.iconsService.getIconUrl('Excluir');
    this.editIcon = this.iconsService.getIconUrl('Editar');
  }

  ngOnInit(): void {
    if (this.pessoaId) {
      this.enderecos$ = this.enderecoService.getEnderecosPorUsuario(this.pessoaId);
    }
  }

  ngOnDestroy(): void {
    console.log('EnderecoViewComponent destruído!');
  }

  removerEndereco(enderecoId: number): void {
    const modalRef = this.modalService.open(DialogConfirmedComponent);
    modalRef.componentInstance.modalTitle = 'Confirmação';
    modalRef.componentInstance.modalBodyText = 'Tem certeza que deseja remover este endereço?';
    modalRef.componentInstance.modalButtonText = 'Confirmar';
    modalRef.componentInstance.modalButtonClass = 'btn-danger';

    modalRef.componentInstance.onClose.subscribe(() => {
      // Lógica ao fechar o modal (pode ser vazia)
    });

    modalRef.componentInstance.onSaveChanges.subscribe(() => {
      // Se confirmado, então remove o endereço
      this.enderecoService.deleteEndereco(enderecoId.toString()).subscribe(
        () => {
          console.log('Endereço removido com sucesso!');
          this.alertService.showAlert('Endereço removido com sucesso!', 'alert-primary');
          this.atualizarEnderecos();
        },
        (error: any) => {
          console.error('Erro ao remover endereço:', error);
        }
      );
    });
  }


  abrirModalBootstrap(endereco: Endereco): void {
    this.enderecoSharedService.setEnderecoId(endereco.id!);

    const modalRef = this.modalService.open(EnderecoEditarComponent, { size: 'lg' });
    modalRef.componentInstance.pessoaId = this.pessoaId;
    modalRef.componentInstance.enderecoId = endereco.id;
    modalRef.result.then(
      (result: any) => {
        this.atualizarEnderecos();
        this.alertService.showAlert('Endereço atualizado com sucesso!', 'alert-primary');
      },
      (reason: any) => {
        this.alertService.showAlert('Erro ao atualizado endereço!', 'alert-danger' );

      }
    );
  }


  private atualizarEnderecos(): void {
    if (this.pessoaId) {
      this.enderecos$ = this.enderecoService.getEnderecosPorUsuario(this.pessoaId);

    }
  }
}
