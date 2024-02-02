import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsService } from 'src/app/shared/util/icons.service'
import { ClienteCadastroRoutes } from './cliente-cadastro.routing';
import { ClienteCadastroComponent } from './cliente-cadastro.component';
@NgModule({
  declarations: [
    ClienteCadastroComponent,

  ],
  providers: [IconsService],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ClienteCadastroRoutes,
  ],
  exports: [

  ]

})
export class ClienteCadastroModule { }
