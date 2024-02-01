import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'clientes', loadChildren: () => import('./cliente.module').then(m => m.ClienteModule),
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
