import { Component, Input, OnInit } from '@angular/core';
import { Telefone } from '../telefone';
import { TelefoneService } from '../telefone.service';
import { IconsService } from '../../../shared/util/icons.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TelefoneEditComponent } from '../telefone-edit/telefone-edit.component';
import { Observable } from 'rxjs';

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

  constructor(private telefoneService: TelefoneService, private iconsService: IconsService, private alertService: AlertService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.delIcon = this.iconsService.getIconUrl('Excluir');
    this.editIcon = this.iconsService.getIconUrl('Editar');
    this.carregarTelefones();
  }

  carregarTelefones(): void {
    if (this.pessoaId) {
      this.telefones$ = this.telefoneService.getTelefonesPorUsuario(this.pessoaId);
      console.log(this.telefones$);
    }
  }

  editarTelefone(telefone: Telefone): void {
    const telefoneId = telefone.id;
    const modalRef = this.modalService.open(TelefoneEditComponent, { size: 'sm' });
    modalRef.componentInstance.telefoneId = telefoneId;
    modalRef.componentInstance.userId = this.pessoaId;
    modalRef.componentInstance.telefoneAdicionado.subscribe(() => {
      modalRef.close();
      this.carregarTelefones();
    });
  }

  removerTelefone(telefoneId: number): void {
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
  }
}
