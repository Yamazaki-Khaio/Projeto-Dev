import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizadorCadastroComponent } from './localizador-cadastro/localizador-cadastro.component';
import { LocalizadorConstrucaoComponent } from './localizador-construcao/localizador-construcao.component';
const routes: Routes = [
  { path: 'cadastro', component: LocalizadorCadastroComponent},
  { path: '', component: LocalizadorConstrucaoComponent },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalizadorRoutingModule { }
