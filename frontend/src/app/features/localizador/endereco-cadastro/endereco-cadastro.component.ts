import { Component } from '@angular/core';
import { IconsService } from '../../../shared/util/icons.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.iconAdd = this.IconsService.getIconUrl('add')
    this.openedIconUrl = this.IconsService.getIconUrl('icon-obrigatorio')
    this.iconClose = this.IconsService.getIconUrl('iconclose')
    this.enderecoAddForm = this.fb.group({
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });

  }
  voltar() {
    this.modalService.dismissAll('endereco-cadastro');
  }


  onSubmit() {
    throw new Error('Method not implemented.');
    }

}
