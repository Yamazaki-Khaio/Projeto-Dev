import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./layout/layout-login/layout-login.module').then(m => m.LayoutLogoutModule) },
  { path: 'profile', loadChildren: () => import('./layout/layout-logado/layout-logado.module').then(m => m.LayoutLogodoModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
