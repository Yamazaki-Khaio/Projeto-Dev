import { Component } from '@angular/core';
import { IconsService } from '../../../shared/util/icons.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-representante-home',
  templateUrl: './representante-home.component.html',
  styleUrls: ['./representante-home.component.scss']
})
export class RepresentanteHomeComponent {

  openedIconUrl: string = '';
  pessoaId: number = 0;

  constructor(
    private IconsService: IconsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.openedIconUrl = this.IconsService.getIconUrl('icon-obrigatorio');
    this.pessoaId = this.route.snapshot.params['id'];
    console.log(this.pessoaId)
  }


  addRepresentante() {
    console.log(this.pessoaId)

    // Implemente a lógica para adicionar um representante
    console.log('Representante adicionado com sucesso.');
    // Navegar para a rota substituindo :pessoaId pelo valor real
    this.router.navigate([`/profile/cliente/representante/${this.pessoaId}/cadastro`]);
  }



}
