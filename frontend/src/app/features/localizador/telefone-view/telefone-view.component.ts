import { Component, OnInit } from '@angular/core';
import { Telefone } from '../telefone'; // Certifique-se de importar o modelo de telefone apropriado
import { TelefoneService } from '../telefone.service'; // Certifique-se de importar o serviço de telefone
import { IconsService } from 'src/app/shared/util/icons.service';

@Component({
  selector: 'app-telefone-view',
  templateUrl: './telefone-view.component.html',
  styleUrls: ['./telefone-view.component.scss']
})
export class TelefoneViewComponent implements OnInit {
  telefones: Telefone[] = [];
  delIcon: string = '';
  editIcon: string = '';

  constructor(private telefoneService: TelefoneService, private iconsService: IconsService) { }

  ngOnInit(): void {
    this.carregarTelefones();
    this.delIcon = this.iconsService.getIconUrl('Excluir');
    this.editIcon = this.iconsService.getIconUrl('Editar');
  }

  carregarTelefones() {
    this.telefoneService.getTelefones().subscribe(
      (telefones: Telefone[]) => {
        this.telefones = telefones;
      },
      error => {
        console.error('Erro ao carregar telefones:', error);
      }
    );
  }
}
