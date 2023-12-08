import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteHomeComponent } from './/cliente-home/cliente-home.component'
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { ClienteEditarComponent } from './cliente-editar/cliente-editar.component';


const routes: Routes = [
  { path: '', component: ClienteHomeComponent },
  { path: 'home', component: ClienteHomeComponent },
  {
    path: 'cadastro', component: ClienteCadastroComponent
  },
  {
    path: 'editar/:id', component: ClienteEditarComponent,
  },
  {
    path: 'localizador/:id',
    loadChildren: () => import('../localizador/localizador.module').then(m => m.LocalizadorModule)
  },
  {
    path: 'representante/:id',
    loadChildren: () => import('../representante/representante.module').then(m => m.RepresentanteModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
