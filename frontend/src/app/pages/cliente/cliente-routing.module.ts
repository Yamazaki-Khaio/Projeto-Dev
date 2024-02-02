import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: ':id', loadChildren: () => import('./cliente.module').then(m => m.ClienteModule),
    children: [
      {
        path: 'editar',
        loadChildren: () => import('./cliente-editar/cliente-editar.module').then(m => m.ClienteEditarModule)
      },
      {
        path: 'novo',
        loadChildren: () => import('./cliente-cadastro/cliente-cadastro.module').then(m => m.ClienteCadastroModule)
      },
    ]
  },

  {
    path: '**', redirectTo: 'clientes', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
