import { Routes, RouterModule } from '@angular/router';
import { ClienteEditarComponent } from '../cliente-editar/cliente-editar.component';

const routes: Routes = [
  {
    path: ':id',
    component: ClienteEditarComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./sub-pages/sub-pages.module').then(m => m.SubPagesModule)
      }
    ]


  }
];

export const ClienteEditarRoutes = RouterModule.forChild(routes);
