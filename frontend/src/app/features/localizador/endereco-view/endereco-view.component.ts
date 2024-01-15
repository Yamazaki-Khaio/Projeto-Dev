import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnderecoService } from '../endereco.service';
import { IconsService } from 'src/app/shared/util/icons.service';
import { Endereco } from '../endereco';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-endereco-view',
  templateUrl: './endereco-view.component.html',
  styleUrls: ['./endereco-view.component.scss']
})
export class EnderecoViewComponent implements OnInit {

  @Input() pessoaId!: string;
  enderecos$: Observable<Endereco[]> = new Observable<Endereco[]>(); // Atualize o tipo conforme necessário
  delIcon: string = '';
  editIcon: string = '';

  constructor(
    private enderecoService: EnderecoService,
    private route: ActivatedRoute,
    private iconsService: IconsService
  ) {
    this.delIcon = this.iconsService.getIconUrl('Excluir');
    this.editIcon = this.iconsService.getIconUrl('Editar');
  }

  ngOnInit(): void {
    if (this.pessoaId) {
      this.enderecos$ = this.enderecoService.getEnderecosPorUsuario(this.pessoaId);
    }
  }

  removerEndereco(enderecoId: string): void {
    this.enderecoService.deleteEndereco(enderecoId).subscribe(
      () => {
        console.log('Endereço removido com sucesso!');
        // Atualizar a lista de endereços após a remoção, se necessário
        this.enderecos$ = this.enderecoService.getEnderecosPorUsuario(this.pessoaId);
      },
      (error: any) => {
        console.error('Erro ao remover endereço:', error);
      }
    );
  }

  abrirModalBootstrap(): void {
    // Lógica para abrir o modal, se necessário
  }
}
