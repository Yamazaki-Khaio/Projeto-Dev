import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule
import { SharedModule } from 'src/app/shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    UserRegistrationComponent,
    UserLoginComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    

  ],
  exports: [
    UserRegistrationComponent,
    UserLoginComponent,
    UserProfileComponent
  ],
  providers: [
    // UsersService
  ]


})
export class UsersModule { }
