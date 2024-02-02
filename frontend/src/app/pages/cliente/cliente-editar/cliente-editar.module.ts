import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsService } from 'src/app/shared/util/icons.service'
import { ClienteEditarRoutes } from './cliente-editar.routing';
import { LocalizadorCadastroComponent } from './sub-pages/localizador/localizador-cadastro/localizador-cadastro.component';
import { ClienteEditarComponent } from './cliente-editar.component';
import { RepresentanteCadastroComponent } from './sub-pages/representante/representante-cadastro/representante-cadastro.component';
import { RepresentanteHomeComponent } from './sub-pages/representante/representante-home/representante-home.component';
import { EmailCadastroComponent } from './sub-pages/localizador/email-cadastro/email-cadastro.component';
import { EmailEditComponent } from './sub-pages/localizador/email-edit/email-edit.component';
import { EmailViewComponent } from './sub-pages/localizador/email-view/email-view.component';
import { EnderecoCadastroComponent } from './sub-pages/localizador/endereco-cadastro/endereco-cadastro.component';
import { EnderecoEditarComponent } from './sub-pages/localizador/endereco-edit/endereco-edit.component';
import { EnderecoViewComponent } from './sub-pages/localizador/endereco-view/endereco-view.component';
import { LocalizadorConstrucaoComponent } from './sub-pages/localizador/localizador-construcao/localizador-construcao.component';
import { TelefoneCadastroComponent } from './sub-pages/localizador/telefone-cadastro/telefone-cadastro.component';
import { TelefoneEditComponent } from './sub-pages/localizador/telefone-edit/telefone-edit.component';
import { TelefoneViewComponent } from './sub-pages/localizador/telefone-view/telefone-view.component';


@NgModule({
  declarations: [
    LocalizadorCadastroComponent,
    ClienteEditarComponent,
    RepresentanteCadastroComponent,
    RepresentanteHomeComponent,
    EnderecoViewComponent,
    TelefoneViewComponent,
    EmailViewComponent,
    LocalizadorConstrucaoComponent,
    EnderecoCadastroComponent,
    TelefoneCadastroComponent,
    EmailCadastroComponent,
    EnderecoEditarComponent,
    EmailEditComponent,
    TelefoneEditComponent,



  ],
  providers: [IconsService],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ClienteEditarRoutes,
  ],
  exports: [


  ]

})
export class ClienteEditarModule { }
