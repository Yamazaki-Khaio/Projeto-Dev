import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'clientes', loadChildren: () => import('./cliente.module').then(m => m.ClienteModule),
    children: [
      {
        path: 'editar',
        loadChildren: () => import('./cliente-editar/cliente-editar.module').then(m => m.ClienteEditarModule)
      },
      {
        path: 'cadastrar',
        loadChildren: () => import('./cliente-cadastro/cliente-cadastro.module').then(m => m.ClienteCadastroModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./cliente-home/cliente-home.module').then(m => m.ClienteHomeModule)
      },
    ]
  },

  {
    path: '**', redirectTo: 'home', pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
