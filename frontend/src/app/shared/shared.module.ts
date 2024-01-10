//src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShowHidePasswordDirective } from './directives/show-hide-password.directive';
import { PasswordMatchDirective } from './directives/password-match.directive';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IdentificadorValidatorDirective } from './directives/identificador-validator.directive';
import { FormsComponent } from './components/forms/forms.component';
import { ListLinkComponent } from './components/list-link/list-link.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SituacaoComponent } from './components/situacao/situacao.component';
import { IconsService } from './util/icons.service';
import { AlertComponent } from './components/alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ShowHidePasswordDirective,
    PasswordMatchDirective,
    SidebarComponent,
    IdentificadorValidatorDirective,
    FormsComponent,
    ListLinkComponent,
    BreadcrumbComponent,
    SituacaoComponent,
    AlertComponent,


  ],
  providers: [
    IconsService
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    


  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ShowHidePasswordDirective,
    PasswordMatchDirective,
    SidebarComponent,
    IdentificadorValidatorDirective,
    FormsComponent,
    ListLinkComponent,
    BreadcrumbComponent,
    SituacaoComponent,
    AlertComponent,



  ]

})

export class SharedModule { }
