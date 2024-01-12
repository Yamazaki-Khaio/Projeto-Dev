
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Endereco } from '../endereco';
import { EnderecoService } from '../endereco.service';
import { IconsService } from 'src/app/shared/util/icons.service';

@Component({
  selector: 'app-endereco-view',
  templateUrl: './endereco-view.component.html',
  styleUrls: ['./endereco-view.component.scss']
})
export class EnderecoViewComponent implements OnInit {

  @Input() pessoaId!: string;
  endereco$: Observable<Endereco>;
  delIcon: string = '';
  editIcon: string = '';


  constructor(
    private enderecoService: EnderecoService,
    private route: ActivatedRoute,
    private iconsService: IconsService
  ) {
    this.endereco$ = this.enderecoService.getEndereco(this.pessoaId);
    this.delIcon = this.iconsService.getIconUrl('Excluir');
    this.editIcon = this.iconsService.getIconUrl('Editar');
  }

  ngOnInit(): void {
    if (this.pessoaId) {
      this.endereco$ = this.enderecoService.getEndereco(this.pessoaId.toString());
    }
  }
  removerEndereco(arg0: any) {
    throw new Error('Method not implemented.');
    }
    abrirModalBootstrap() {
    throw new Error('Method not implemented.');
    }
}

