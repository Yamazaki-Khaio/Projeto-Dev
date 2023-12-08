import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizadorCadastroComponent } from './localizador-cadastro/localizador-cadastro.component';

const routes: Routes = [
  { path: '', component: LocalizadorCadastroComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalizadorRoutingModule { }
