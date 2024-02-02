import { Routes, RouterModule } from '@angular/router';
import { ClienteEditarComponent } from '../cliente-editar/cliente-editar.component';
import { LocalizadorCadastroComponent } from './sub-pages/localizador/localizador-cadastro/localizador-cadastro.component';

const routes: Routes = [
  {
    path: ':idClienteEditar',
    component: ClienteEditarComponent,
    children: [
      { path: 'localizacao', component: LocalizadorCadastroComponent },
      { path: 'representante', component: LocalizadorCadastroComponent },

    ]
  }
];

export const ClienteEditarRoutes = RouterModule.forChild(routes);
