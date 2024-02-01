import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'clientes', loadChildren: () => import('../../pages/cliente/cliente.module').then(m => m.ClienteModule)},
    ]

   },
];

export const LayoutLogadoRoutes = RouterModule.forChild(routes);
