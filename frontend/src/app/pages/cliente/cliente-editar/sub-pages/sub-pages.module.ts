import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule
import { SubPagesRoutes } from './sub-pages.routing';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SubPagesRoutes,
    ReactiveFormsModule // Adicione o ReactiveFormsModule aos imports
  ]
})
export class SubPagesModule { }
