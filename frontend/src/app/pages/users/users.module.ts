import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [
    UserRegistrationComponent,
    UserLoginComponent,
    UsersHomeComponent,
    UserEditComponent


  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule


  ],
  exports: [

  ],
  providers: [
    // UsersService
    //apiService
  ]


})
export class UsersModule { }
