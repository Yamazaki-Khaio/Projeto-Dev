import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule

import { FeaturesRoutingModule } from './features-routing.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ReactiveFormsModule // Adicione o ReactiveFormsModule aos imports
  ]


})
export class FeaturesModule { }
