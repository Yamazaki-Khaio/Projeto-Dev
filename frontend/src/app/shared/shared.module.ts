//src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShowHidePasswordDirective } from './directives/show-hide-password.directive';
import { PasswordMatchDirective } from './directives/password-match.directive';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ShowHidePasswordDirective,
    PasswordMatchDirective,
    SidebarComponent,


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
    
  ]

})
export class SharedModule { }
