import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IconsService } from '../../../shared/util/icons.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-representante-cadastro',
  templateUrl: './representante-cadastro.component.html',
  styleUrls: ['./representante-cadastro.component.scss']
})
export class RepresentanteCadastroComponent {

  alertMessage: string | null = null;
  openIconUrl: string = '';
  pessoaId: number = 0;
  RepresentanteForm: FormGroup = new FormGroup({});

  constructor(
    private IconsService: IconsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.openIconUrl = this.IconsService.getIconUrl('icon-obrigatorio');
    this.pessoaId = this.route.snapshot.params['id'];
    this.RepresentanteForm = this.fb.group({
      identificador: ['', [Validators.required]],
      nome: ['', [Validators.required]],
    });

  }

  onSubmit(): void {
    this.alertMessage = 'Representante adicionado com sucesso.';
    
    console.log(this.RepresentanteForm.value);
    this.RepresentanteForm.reset();
  }

  voltar() {
    this.router.navigate(['/profile/cliente/representante/:id_pessoa']);
    }

}
