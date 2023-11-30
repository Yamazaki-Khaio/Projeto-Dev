import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteHomeComponent } from './cliente-home/cliente-home.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { ClienteEditarComponent } from './cliente-editar/cliente-editar.component';


@NgModule({
  declarations: [
    ClienteHomeComponent,
    ClienteCadastroComponent,
    ClienteEditarComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,

  ],
  exports: [
    ClienteHomeComponent,
    ClienteCadastroComponent
  ]

})
export class ClienteModule { }
