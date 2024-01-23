import { Component, OnInit } from '@angular/core';
import { IconsService } from '../../../shared/util/icons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RepresentanteService } from '../representante.service';
import { Representante } from '../representante';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Observable, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogConfirmedComponent } from 'src/app/shared/components/dialog-confirmed/dialog-confirmed.component';

@Component({
  selector: 'app-representante-home',
  templateUrl: './representante-home.component.html',
  styleUrls: ['./representante-home.component.scss']
})
export class RepresentanteHomeComponent implements OnInit {

  openedIconUrl: string = '';
  editIcon: string = '';
  delIcon: string = '';
  pessoaId!: string;
  representantes$:  Observable<Representante[]> = new Observable<Representante[]>();

  constructor(
    private iconsService: IconsService,
    private router: Router,
    private route: ActivatedRoute,
    private representanteService: RepresentanteService,
    private alertService: AlertService,
    private modalService: NgbModal,
  ) {
    this.editIcon = this.iconsService.getIconUrl('Editar');
    this.delIcon = this.iconsService.getIconUrl('Excluir');
    this.openedIconUrl = this.iconsService.getIconUrl('icon-obrigatorio');
    this.pessoaId = this.route.snapshot.params['id'];
    this.representantes$ = this.representanteService.getRepresentantesPorUsuario(this.pessoaId);
  }

  ngOnInit(): void {
    this.carregarRepresentantes();
  }

  carregarRepresentantes(): void {
    if (this.pessoaId) {
      this.representantes$ = this.representanteService.getRepresentantesPorUsuario(this.pessoaId);
      console.log('Representantes$: ', this.representantes$);
    }
  }


  addRepresentante() {
    this.router.navigate([`/profile/cliente/representante/${this.pessoaId}/cadastro`]);
  }

  editarRepresentante(representante: Representante) {
    this.router.navigate([`/profile/cliente/representante/${this.pessoaId}/editar/${representante.id}`]);
    // Implemente a lógica para editar um representante
  }

  deleteRepresentante(representante: Representante) {
    const modalRef = this.modalService.open(DialogConfirmedComponent);
    modalRef.componentInstance.modalTitle = 'Excluir representante?';
    modalRef.componentInstance.modalButtonText = 'Confirmar';
    modalRef.componentInstance.modalButtonClass = 'btn-danger';

    modalRef.componentInstance.onClose.subscribe(() => {
      // Lógica ao fechar o modal (pode ser vazia)
    });

    modalRef.componentInstance.onSaveChanges.subscribe(() => {
      // Se confirmado, então remove o representante
      this.representanteService.deleteRepresentante(representante.id!).subscribe(
        () => {
          this.alertService.showAlert('Representante removido com sucesso.', 'alert-primary');
          console.log('Representante removido com sucesso!');
          this.carregarRepresentantes();
        },
        (error: any) => {
          console.error('Erro ao remover representante:', error);
        }
      );
    });
  }


}
