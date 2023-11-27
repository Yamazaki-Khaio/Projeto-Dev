import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteHomeComponent } from './cliente-home/cliente-home.component';


@NgModule({
  declarations: [
    ClienteHomeComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
  ],

})
export class ClienteModule { }
