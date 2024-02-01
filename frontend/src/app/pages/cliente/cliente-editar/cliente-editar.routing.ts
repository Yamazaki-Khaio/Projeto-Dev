import { Routes, RouterModule } from '@angular/router';
import { ClienteEditarComponent } from '../cliente-editar/cliente-editar.component';

const routes: Routes = [
  {
    path: 'editar',
    component: ClienteEditarComponent,
    redirectTo: 'editar',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./sub-pages/sub-pages.module').then(m => m.SubPagesModule)
      }
    ]


  }
];

export const ClienteEditarRoutes = RouterModule.forChild(routes);
