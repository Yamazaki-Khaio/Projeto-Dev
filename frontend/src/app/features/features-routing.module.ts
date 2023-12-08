import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{
  path: 'users',
  loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
},
{
  path: 'localizador',
  loadChildren: () => import('../features/localizador/localizador.module').then(m => m.LocalizadorModule)
},
{
  path: 'representante',
  loadChildren: () => import('../features/representante/representante.module').then(m => m.RepresentanteModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
