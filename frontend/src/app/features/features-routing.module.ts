import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './users/auth.guard';


const routes: Routes = [{
  path: 'users',
  loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
},
{
  path: 'localizador',
  canActivate: [AuthGuard],
  loadChildren: () => import('../features/localizador/localizador.module').then(m => m.LocalizadorModule)
},
{
  path: 'representante',
  canActivate: [AuthGuard],
  loadChildren: () => import('../features/representante/representante.module').then(m => m.RepresentanteModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
