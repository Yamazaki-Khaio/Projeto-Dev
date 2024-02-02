import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserLoginComponent } from './user-login.component';
import { UserLoginRouting } from './user-login.routing';

@NgModule({
  declarations: [
    UserLoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    UserLoginRouting,
  ],
  exports: [],
  providers: []


})
export class UserLoginModule { }
