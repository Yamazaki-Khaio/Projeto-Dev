import { Routes, RouterModule } from '@angular/router';
import { LayoutLogadoComponent } from './layout-logado.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutLogadoComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', loadChildren: () => import('../../pages/users/user-home/user-home.module').then(m => m.UserHomeModule)
      },
      {
        path: 'cliente', loadChildren: () => import('../../pages/cliente/cliente-home/cliente-home.module').then(m => m.ClienteHomeModule)},
      {
        path: 'cliente/criar', loadChildren: () => import('../../pages/cliente/cliente-cadastro/cliente-cadastro.module').then(m => m.ClienteCadastroModule)
      },
      {
        path: 'cliente/editar', loadChildren: () => import('../../pages/cliente/cliente-editar/cliente-editar.module').then(m => m.ClienteEditarModule)
      },
      {path: '**', redirectTo: ''}

    ]

  }

];

export const LayoutLogadoRoutes = RouterModule.forChild(routes);
