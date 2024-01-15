import { Component, Input } from '@angular/core';
import { IconsService } from '../../../shared/util/icons.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnderecoService } from '../endereco.service';
import { Endereco } from '../endereco';

@Component({
  selector: 'app-endereco-cadastro',
  templateUrl: './endereco-cadastro.component.html',
  styleUrls: ['./endereco-cadastro.component.scss']
})
export class EnderecoCadastroComponent {
  @Input() pessoaId!: string;
  iconAdd: string = '';
  openedIconUrl: string = '';
  iconClose: string = '';
  enderecoAddForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private IconsService: IconsService,
    private modalService: NgbModal,
    private enderecoService: EnderecoService,
  ) {
  }

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
    console.log(this.enderecoAddForm.value);
    const novoEndereco: Endereco = this.enderecoAddForm.value;
    this.enderecoService.createEndereco(this.pessoaId , novoEndereco).subscribe(
      (data: Endereco) => {
        console.log('Endereço adicionado com sucesso. Dados: ' + data);
        this.modalService.dismissAll('endereco-cadastro');
        this.enderecoAddForm.reset();
      },
      (error) => {
        console.error('Erro ao adicionar endereço. Erro: ' + error);
        alert('Erro ao adicionar endereço. Erro: ' + error);
      }
    );



    }

}
