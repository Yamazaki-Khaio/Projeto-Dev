import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteHomeComponent } from './/cliente-home/cliente-home.component'
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';

const routes: Routes = [
  { path: '', component: ClienteHomeComponent},
  { path: 'home', component: ClienteHomeComponent },
  {path: 'cadastro', component: ClienteCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
