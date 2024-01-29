import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './layout-logado/user-profile.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ],
  exports: [
  ]
})
export class CoreModule { }
