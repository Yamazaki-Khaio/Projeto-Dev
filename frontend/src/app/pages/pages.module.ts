import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule

import { PagesRoutingModule } from './pages-routing.module';
import { IconsService } from '../shared/util/icons.service';

@NgModule({
  declarations: [

  ],
  providers: [ IconsService ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule // Adicione o ReactiveFormsModule aos imports
  ]


})
export class PagesModule { }
