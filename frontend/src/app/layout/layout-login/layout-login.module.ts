import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsService } from 'src/app/shared/util/icons.service'
import { LayoutLogoutRoutes } from './layout-login.routing';
import { LayoutLoginComponent } from './layout-login.component';
@NgModule({
  declarations: [
    LayoutLoginComponent,

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
