import { Component } from '@angular/core';
import { IconsService } from '../../../shared/util/icons.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-endereco-cadastro',
  templateUrl: './endereco-cadastro.component.html',
  styleUrls: ['./endereco-cadastro.component.scss']
})
export class EnderecoCadastroComponent {

  iconAdd: string = '';
  openedIconUrl: string = '';
  iconClose: string = '';
  enderecoAddForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private IconsService: IconsService,
  ) { }

  ngOnInit(): void {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.iconAdd = this.IconsService.getIconUrl('add')
    this.openedIconUrl = this.IconsService.getIconUrl('icon-obrigatorio')
    this.iconClose = this.IconsService.getIconUrl('iconclose')
    this.enderecoAddForm = this.fb.group({
      inputCep: ['', [Validators.required]],
      inputLogradouro: ['', [Validators.required]],
      inputNumero: ['', [Validators.required]],
      inputComplemento: [''],
      inputBairro: ['', [Validators.required]],
      inputCidade: ['', [Validators.required]],
      inputEstado: ['', [Validators.required]],
    });
  }

  voltar() {
    throw new Error('Method not implemented.');
    }

    onSubmit() {
      throw new Error('Method not implemented.');
      }


}
