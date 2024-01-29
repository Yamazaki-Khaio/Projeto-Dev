import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IconsService } from '../../../shared/util/icons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RepresentanteService } from '../representante.service';
import { Representante } from '../representante';
import { AlertService } from 'src/app/shared/services/alert.service';



@Component({
  selector: 'app-representante-cadastro',
  templateUrl: './representante-cadastro.component.html',
  styleUrls: ['./representante-cadastro.component.scss']
})
export class RepresentanteCadastroComponent {

  alertMessage: string | null = null;
  openIconUrl: string = '';
  pessoaId!: string
  RepresentanteForm: FormGroup = new FormGroup({});

  constructor(
    private IconsService: IconsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private representanteService: RepresentanteService,
    private alertService: AlertService,
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
    const novoRepresentante: Representante = this.RepresentanteForm.value;
    console.log(novoRepresentante);
    if(this.RepresentanteForm.valid){
      this.representanteService.createRepresentante(novoRepresentante, this.pessoaId).subscribe(
        response => {
          console.log('Representante adicionado com sucesso:', response);
          this.alertService.showAlert('Representante adicionado com sucesso.', 'alert-primary');
          this.RepresentanteForm.reset();
          this.router.navigate([`/profile/cliente/representante/${this.pessoaId}`]);

          },
        error => {
          this.alertService.showAlert('Erro ao adicionar representante.', 'alert-danger');
          console.error('Erro ao adicionar representante:', error);

        }
      );

    }
  }

  voltar() {
    this.router.navigate(['/profile/cliente/representante/', this.pessoaId]);
    }

}
