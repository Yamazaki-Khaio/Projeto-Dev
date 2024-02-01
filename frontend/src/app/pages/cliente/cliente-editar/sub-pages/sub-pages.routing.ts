import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'localizador',
    loadChildren: () => import('./localizador/localizador.module').then(m => m.LocalizadorModule),
    },
  {
    path: 'representante', loadChildren: () => import('./representante/representante.module').then(m => m.RepresentanteModule),
  },
];

export const SubPagesRoutes = RouterModule.forChild(routes);
