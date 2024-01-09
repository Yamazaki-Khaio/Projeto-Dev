import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepresentanteCadastroComponent } from './representante-cadastro/representante-cadastro.component';
import { RepresentanteHomeComponent } from './representante-home/representante-home.component';
const routes: Routes = [
  {'path': '', 'component': RepresentanteHomeComponent},
  {'path': 'cadastro', 'component': RepresentanteCadastroComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepresentanteRoutingModule { }
