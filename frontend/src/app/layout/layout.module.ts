import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './layout-logado/user-profile.component';
import { LayoutLogoutComponent } from './layout-logout/layout-logout.component';



@NgModule({
  declarations: [
    UserProfileComponent,
    LayoutLogoutComponent,


  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class LayoutModule { }

