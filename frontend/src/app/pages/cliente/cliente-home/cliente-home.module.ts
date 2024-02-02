import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsService } from 'src/app/shared/util/icons.service'
import { ClienteHomeRoutes } from './cliente-home.routing';
import { ClienteHomeComponent } from './cliente-home.component';

@NgModule({
  declarations: [
    ClienteHomeComponent,

  ],
  providers: [IconsService],
  imports: [
  CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ClienteHomeRoutes,
  ],
  exports: [


  ]

})
export class ClienteHomeModule { }
