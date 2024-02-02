import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsService } from 'src/app/shared/util/icons.service'
import { LayoutLogoutRoutes } from './layout-logout.routing';
@NgModule({
  declarations: [

  ],
  providers: [IconsService],
  imports: [
  CommonModule,
    SharedModule,
    ReactiveFormsModule,
    LayoutLogoutRoutes,
  ],

  exports: [


  ]

})
export class LayoutLogoutModule { }
