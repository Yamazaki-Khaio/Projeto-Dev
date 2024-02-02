import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsService } from 'src/app/shared/util/icons.service'
import { LayoutLogadoRoutes } from './layout-logado.routing';
import { LayoutLogadoComponent } from './layout-logado.component';
import { UserEditComponent } from 'src/app/pages/users/user-edit/user-edit.component';

@NgModule({
  declarations: [
    LayoutLogadoComponent,
    UserEditComponent,

  ],
  providers: [IconsService],
  imports: [
  CommonModule,
    SharedModule,
    ReactiveFormsModule,
    LayoutLogadoRoutes,

  ],

  exports: [


  ]

})
export class LayoutLogodoModule { }
