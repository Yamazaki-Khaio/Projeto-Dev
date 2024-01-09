
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Endereco } from '../endereco';
import { EnderecoService } from '../endereco.service';

@Component({
  selector: 'app-endereco-view',
  templateUrl: './endereco-view.component.html',
  styleUrls: ['./endereco-view.component.scss']
})
export class EnderecoViewComponent implements OnInit {
removerEndereco(arg0: any) {
throw new Error('Method not implemented.');
}
abrirModalBootstrap() {
throw new Error('Method not implemented.');
}
  @Input() pessoaId!: number;
  endereco$: Observable<Endereco>;


  constructor(
    private enderecoService: EnderecoService,
    private route: ActivatedRoute
  ) {
    this.pessoaId = this.route.snapshot.params['id_pessoa'];
    this.endereco$ = this.enderecoService.getEndereco(this.pessoaId.toString());
  }

  ngOnInit(): void {
    if (this.pessoaId) {
      this.endereco$ = this.enderecoService.getEndereco(this.pessoaId.toString());
    }
  }
}

