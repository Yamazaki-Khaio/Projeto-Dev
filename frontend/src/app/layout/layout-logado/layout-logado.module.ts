import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsService } from 'src/app/shared/util/icons.service'
import { LayoutLogadoRoutes } from './layout-logado.routing';

@NgModule({
  declarations: [

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
