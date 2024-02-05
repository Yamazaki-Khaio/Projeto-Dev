import { Routes, RouterModule } from '@angular/router';
import { ClienteEditarComponent } from '../cliente-editar/cliente-editar.component';
import { LocalizadorCadastroComponent } from './sub-pages/localizador/localizador-cadastro/localizador-cadastro.component';
import { RepresentanteHomeComponent } from './sub-pages/representante/representante-home/representante-home.component';
import { RepresentanteCadastroComponent } from './sub-pages/representante/representante-cadastro/representante-cadastro.component';

const routes: Routes = [
  {
    path: ':idClienteEditar',
    component: ClienteEditarComponent,
  }
  ,
  {
    path: 'localizacao/:idClienteEditar',
    component: LocalizadorCadastroComponent
  },
  {
    path: 'representante/:idClienteEditar',
    component: RepresentanteHomeComponent,
  },
  {
    path: 'representante/:idClienteEditar/cadastro',
    component: RepresentanteCadastroComponent,
  },

]

export const ClienteEditarRoutes = RouterModule.forChild(routes);
