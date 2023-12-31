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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListLinkComponent } from './components/list-link/list-link.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

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
    BreadcrumbComponent

  ],
  imports: [
    CommonModule,
    SharedRoutingModule
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
  ]

})

export class SharedModule { }
