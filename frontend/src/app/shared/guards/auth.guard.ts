// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../../pages/users/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isAuth()) {
      // Se o usuário estiver autenticado, permita o acesso
      route.data = { user: this.userService.getUser() };
      state.url = '/users/profile';
      return true;
    } else {
      // Redirecionar para a página de login se não estiver autenticado
      this.router.navigate(['/users/login']);
      return false;
    }
  }
}
