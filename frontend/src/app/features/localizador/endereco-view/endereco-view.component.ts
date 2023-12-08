
import { Component, OnInit } from '@angular/core';
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
  endereco$: Observable<Endereco>;
  pessoaId!: number;

  constructor(
    private enderecoService: EnderecoService,
    private route: ActivatedRoute
  ) {
    this.pessoaId = this.route.snapshot.params['id_pessoa'];
    this.endereco$ = this.enderecoService.getEndereco(this.pessoaId.toString());
  }

  ngOnInit(): void {
    this.enderecoService.getEndereco(this.pessoaId.toString()).subscribe();
  }
}

